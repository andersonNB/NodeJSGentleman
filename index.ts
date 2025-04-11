const cors = require("cors");
const http = require("http");
import type {IncomingMessage, ServerResponse} from "http";
import {authRouter, characterRouter} from "./routes";

const corsMiddleware = cors();

/**
 * Creates an HTTP server and handles incoming requests.
 * Routes requests to the appropriate router based on the URL.
 * @param {IncomingMessage} req - The incoming HTTP request object.
 * @param {ServerResponse} res - The server response object.
 */
const server = http.createServer(
	async (req: IncomingMessage, res: ServerResponse) => {
		corsMiddleware(req, res, async () => {
			res.setHeader("Content-Type", "application/json");
			try {
				// Route requests to the authentication router
				if (req.url?.startsWith("/auth")) {
					await authRouter(req, res);
				}
				// Route requests to the character router
				else if (req.url?.startsWith("/characters")) {
					await characterRouter(req, res);
				}
				// Handle unknown routes
				else {
					res.statusCode = 404;
					res.end(JSON.stringify({error: "Not Found"}));
				}
			} catch (error) {
				// Handle server errors
				res.statusCode = 500;
				res.end(JSON.stringify({error: error}));
			}
		});
	}
);

/**
 * Starts the HTTP server and listens on port 3000.
 * Logs a message indicating the server is running.
 */
server.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
export default server;
