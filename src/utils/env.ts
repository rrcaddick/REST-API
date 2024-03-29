export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const isDevelopment = (): boolean => getEnv("NODE_ENV") === "development";
