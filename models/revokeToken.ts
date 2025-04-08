const revokedTokens = new Set<string>();

/**
 * Revokes a token by adding it to the revoked tokens set.
 * @param {string} token - The token to revoke.
 * @returns {void}
 */
export const RevokeToken = (token: string): void => {
	if (!token) return;
	revokedTokens.add(token);
};

/**
 * Checks if a token has been revoked.
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is revoked, otherwise false.
 */
export const isTokenRevoked = (token: string): boolean => {
	return revokedTokens.has(token);
};
