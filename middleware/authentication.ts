import type {IncomingMessage, ServerResponse} from "http";
import {verify, type JwtPayload} from "jsonwebtoken";
import {isTokenRevoked} from "../models";
import config from "../config";

export interface AuthenticatedRequest extends IncomingMessage {
	user?: JwtPayload | string;
}

export const authenticateToken = async (
	req: AuthenticatedRequest,
	res: ServerResponse
): Promise<boolean> => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		res.statusCode = 401;
		res.end("Unauthorized: No token provided");
		return false;
	}

	if (isTokenRevoked(token)) {
		res.statusCode = 403;
		res.end("Forbidden: Token revoked");
		return false;
	}

	try {
		const decoded = verify(token, config.jwtSecret);

		req.user = decoded;

		return true;
	} catch {
		res.statusCode = 403;
		res.end("Forbidden: Invalid token");
		return false;
	}
};
