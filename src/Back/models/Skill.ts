import mongoose, { Model, Schema, Types } from 'mongoose';
import { SkillDescription } from '@/Back/models';

export interface ISkill {
	_id: Types.ObjectId;
	name: string;
	level: number;
	description: string;
}

const skillSchema = new Schema({
	description: { type: String, required: true },
	name: { type: String, required: true },
	level: { type: Number, required: true }
});

const SkillModel: Model<ISkill> = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default SkillModel;
