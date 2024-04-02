export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const isDevelopment = (): boolean => getEnv("NODE_ENV") === "development";

export const isTest = (): boolean => getEnv("NODE_ENV") === "test";
