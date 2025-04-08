import type {IncomingMessage, ServerResponse} from "http";
import {authSchema, createUser, HttpMethod} from "../models";
import {parseBody} from "../utils/parseBody";
import {safeParse} from "valibot";

export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const {method, url} = req;

	if (url === "/auth/register" && method === HttpMethod.POST) {
		const body = await parseBody(req);

		const result = safeParse(authSchema, body);

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
		} catch (error) {
			if (error instanceof Error) {
				res.end(error.message);
			} else {
				res.end("Internal server error");
			}
		}
	}
};
