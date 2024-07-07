import crypto from "crypto";

export const hashObject = (object: Object): string => {
  const hash = crypto.createHash("sha256");
  const values = Object.values(object).sort();
  hash.update(JSON.stringify(values));
  return hash.digest("hex");
};
