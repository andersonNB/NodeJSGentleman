import {compare, hash} from "bcrypt";
import {email, minLength, pipe, string, type InferInput} from "valibot";

const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(6));

export const authSchema = Object({
	email: emailSchema,
	password: passwordSchema,
});

export enum Role {
	"ADMIN" = "admin",
	"USER" = "user",
}

export type User = InferInput<typeof authSchema> & {
	id: number;
	role: Role;
	refreshToken?: string;
};

//usuarios que estab en la aplicación
const users: Map<string, User> = new Map();

/**
 * Creates a new user with the given email and password
 * The password is hasshed before storing
 *
 * @param {string} email - the email of the user
 * @param {string} password - the password of the user
 * @returns {User} - the created user
 */

export const createUser = async (
	email: string,
	password: string
): Promise<User> => {
	const hashedPassword = await hash(password, 10);

	const newUser: User = {
		id: Date.now(),
		email,
		password: hashedPassword,
		role: Role.USER,
	};

	users.set(email, newUser);
	return newUser;
};

/**
 * Finds a user bt their given email
 * @param {string} email - the email of the user to find
 * @returns {User | undefined} - the user if found, undefined otherwise
 */
export const findUserByEmail = (email: string): User | undefined => {
	return users.get(email);
};

/**
 * Validates a user's password
 *
 * @param {User} user - the user whose password is to be validated
 * @param {string} password - the password to validate
 * @returns {Promise<boolean>} - true if the password is valid, false otherwise
 */
export const validatePassword = async (
	user: User,
	password: string
): Promise<boolean> => {
	return compare(password, user.password);
};

/**
 * Revoke Token
 * @param {string} email - the email of the user to revoke the token from
 * @returns {boolean} - true if the token was revoked, false otherwise
 */
export const revokeToken = (email: string): boolean => {
	const foundUser = users.get(email);

	if (!foundUser) return false;

	foundUser.refreshToken = undefined;
	users.set(email, foundUser);
	return true;
};

const hola = "mundo";
