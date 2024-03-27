export function parseEnumToObject<T extends Record<string, string | number>>(enumObj: T): Record<keyof T, T[keyof T]> {
  const result: Record<keyof T, T[keyof T]> = {} as Record<keyof T, T[keyof T]>;

  (Object.keys(enumObj) as Array<keyof T>)
    .filter((key) => isNaN(Number(key)))
    .forEach((key) => {
      result[key] = enumObj[key];
    });

  return result;
}
