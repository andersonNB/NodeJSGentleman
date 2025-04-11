import type {IncomingMessage, ServerResponse} from "http";
import {
	authSchema,
	createUser,
	findUserByEmail,
	HttpMethod,
	revokeToken,
	RevokeToken,
	validatePassword,
} from "../models";
import {parseBody} from "../utils/parseBody";
import {safeParse} from "valibot";
import {sign} from "jsonwebtoken";
import config from "../config";
import type {AuthenticatedRequest} from "../middleware/authentication";

export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const {method, url} = req;

	if (url === "/auth/register" && method === HttpMethod.POST) {
		const body = await parseBody(req);

		const result = safeParse(authSchema, body);

		console.log(body);

		if (!result.issues) {
			res.statusCode = 400;
			res.end("Invalid request body");
			return;
		}

		const {email, password} = body;

		try {
			const user = await createUser(email, password);
			res.statusCode = 201;
			res.end(JSON.stringify(user));
			return;
		} catch (error) {
			if (error instanceof Error) {
				res.end(error.message);
			} else {
				res.end(`Internal server error: ${error}`);
			}
		}
	}

	if (url === "/auth/login" && method === HttpMethod.POST) {
		const body = await parseBody(req);
		const result = safeParse(authSchema, body);

		if (result.issues) {
			res.statusCode = 400;
			res.end("Invalid request body");
			return;
		}

		const {email, password} = body;

		const user = findUserByEmail(email);

		if (!user || !(await validatePassword(user, password))) {
			res.statusCode = 401;
			res.end("Invalid email or password");
			return;
		}

		const accessToken = sign(
			{id: user.id, email: user.email, role: user.role},
			config?.jwtSecret,
			{expiresIn: "1h"}
		);

		const refreshToken = sign(
			{id: user.id, email: user.email, role: user.role},
			config?.jwtSecret,
			{expiresIn: "1d"}
		);

		user.refreshToken = refreshToken;

		res.end(
			JSON.stringify({
				accessToken,
				refreshToken,
			})
		);

		return;
	}

	if (url === "auth/logout" && method === HttpMethod.POST) {
		const token = req.headers["authorization"]?.split(" ")[1];

		if (token) {
			RevokeToken(token);

			const formattedReq = req as AuthenticatedRequest;

			if (
				formattedReq.user &&
				typeof formattedReq.user === "object" &&
				"id" in formattedReq.user
			) {
				const result = revokeToken(formattedReq.user?.email);

				if (!result) {
					res.statusCode = 404;
					res.end("User not found");
				}
			}

			res.end("Logged out successfully");
			return;
		}
	}

	res.statusCode = 404;
	res.end("Not Found");
};
