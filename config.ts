export const config = {
	jwtSecret: (process.env.JWT_SECRET as string) || "default_jwt_secret",
	port: (process.env.PORT as string) || 4000,
};

export default config;
