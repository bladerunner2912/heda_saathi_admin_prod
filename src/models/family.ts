import mongoose, { Types, Document, Schema } from "mongoose";

export interface IFamily {
  memberIds: String[];
  metaData: Number[][];
}

export interface IFamilyModel extends IFamily, Document {}

const FamilySchema: Schema = new Schema(
  {
    memberIds: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    metaData: { type: [[Number]], required: true },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Family = mongoose.model<IFamilyModel>("Family", FamilySchema);
export default Family;
