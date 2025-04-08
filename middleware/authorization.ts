import type {ServerResponse} from "http";
import type {AuthenticatedRequest} from "./authentication";
import type {User} from "../models";

/**
 * Middleware to authorize user roles for accessing specific resources.
 * @param {...string[]} roles - The roles allowed to access the resource.
 * @returns {Function} A middleware function that checks the user's role.
 */
export const authorizeRoles = (...roles: string[]) => {
	return async (
		req: AuthenticatedRequest,
		res: ServerResponse
	): Promise<boolean> => {
		/**
		 * The role of the authenticated user.
		 * @type {string | undefined}
		 */
		const userRole = (req.user as User).role;

		if (!userRole || !roles.includes(userRole)) {
			res.statusCode = 403;
			res.end("Forbidden: You don't have permission to access this resource");
			return false;
		}
		return true;
	};
};
