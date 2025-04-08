export const config = {
	jwtSecret: (process.env.JWT_SECRET as string) || "default_jwt_secret",
};

export default config;
