import { Levels } from "./Levels";

// Extracts all string keys from an object
type StringKeys<T> = Extract<keyof T, string>;

// Create a type that maps each key of the Levels enum to a function that accepts a message and any number of additional arguments
type LogLevelMethods = {
  [Key in StringKeys<typeof Levels>]: (message: string, ...meta: any[]) => void;
};

// Create and interface that is in sync with the Levels enum
export interface ILogger extends LogLevelMethods {}
