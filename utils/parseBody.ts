import type {IncomingMessage} from "http";
import {StringDecoder} from "string_decoder";

/**
 * Parses the body of an incoming HTTP request.
 * @param {IncomingMessage} req - The incoming HTTP request object.
 * @returns {Promise<any>} A promise that resolves with the parsed body as a JavaScript object.
 * @throws {Error} If the body cannot be parsed as JSON.
 */
export const parseBody = async (req: IncomingMessage): Promise<any> => {
	return new Promise((resolve, reject) => {
		const decoder = new StringDecoder("utf-8");
		let buffer = "";

		req.on("data", (chunk) => {
			buffer += decoder.write(chunk);
		});

		req.on("end", () => {
			buffer += decoder.end();
		});

		try {
			resolve(JSON.parse(buffer));
		} catch (error) {
			reject(error);
		}
	});
};
