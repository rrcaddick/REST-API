export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const isDevelopment = (): boolean => getEnv("NODE_ENV") === "development";

export function parseEnumToObject<T extends Record<string, string | number>>(enumObj: T): Record<keyof T, T[keyof T]> {
  const result: Record<keyof T, T[keyof T]> = {} as Record<keyof T, T[keyof T]>;

  (Object.keys(enumObj) as Array<keyof T>)
    .filter((key) => isNaN(Number(key)))
    .forEach((key) => {
      result[key] = enumObj[key];
    });

  return result;
}
