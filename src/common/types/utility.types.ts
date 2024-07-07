export type OmitId<T> = Omit<T, "id">;

export type Include<T, K extends Record<string, any>> = T & K;
