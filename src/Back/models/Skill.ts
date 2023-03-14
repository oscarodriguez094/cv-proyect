import mongoose, { Model, Schema, Types } from "mongoose";

export interface ISkill {
  _id: Types.ObjectId;
  language: string;
  name: string;
  level: number;
}

const skillSchema = new Schema({
  language: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
});

const SkillModel: Model<ISkill> =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default SkillModel;
