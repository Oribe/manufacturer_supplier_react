import { type } from "os";

export type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email"
  | undefined;
