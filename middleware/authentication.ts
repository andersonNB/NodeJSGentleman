import type {IncomingMessage} from "http";
import type {JwtPayload} from "jsonwebtoken";

export interface AuthenticatedRequest extends IncomingMessage {
	user?: JwtPayload | string;
}
