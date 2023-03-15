import mongoose, { Model, Schema, Types } from 'mongoose';
import { SkillDescription } from '@/Back/models';

export interface ISkill {
	_id?: Types.ObjectId;
	name: string;
	level: number;
	description: string;
	skillDescriptionId: Types.ObjectId;
}

const skillSchema = new Schema({
	description: { type: String, required: true },
	skillDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillDescription' },
	name: { type: String, required: true },
	level: { type: Number, required: true }
});

const SkillModel: Model<ISkill> = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default SkillModel;
