import { Document, ObjectId, Types } from "mongoose";

type TTodo = Document & {
  _id: Types.ObjectId;
  description: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
};
