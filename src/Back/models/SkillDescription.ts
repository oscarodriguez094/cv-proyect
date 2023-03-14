import mongoose, { Model, Schema, Types } from 'mongoose';
import { ISkill } from './Skill';

export interface ISkillDescription {
	_id: Types.ObjectId;
	title: string;
	description: string;
	developerId: string;
	skills?: ISkill[];
}

const skillDescriptionSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	developerId: { type: String, required: true },
	skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
});

const SkillDescriptionModel: Model<ISkillDescription> =
	mongoose.models.SkillDescription || mongoose.model('SkillDescription', skillDescriptionSchema);

export default SkillDescriptionModel;
