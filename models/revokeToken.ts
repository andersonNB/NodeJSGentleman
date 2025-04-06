const revokedTokens = new Set<string>();

export const RevokeToken = (token: string): void => {
	if (!token) return;
	revokedTokens.add(token);
};

export const isTokenRevoked = (token: string): boolean => {
	return revokedTokens.has(token);
};
