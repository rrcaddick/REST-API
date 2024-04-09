import { Types } from "mongoose";
import { Identity } from "@root/common/types/indentity.type";

export const getIdentity = (id: string): Identity => {
  if (Types.ObjectId.isValid(id)) return new Types.ObjectId(id);

  if (Number.isNaN(parseInt(id))) throw new Error("Invalid identity");

  return parseInt(id);
};
