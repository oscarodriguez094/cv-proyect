import mongoose, { Model, Schema, Types } from 'mongoose';
import { IJob } from './Job';

export interface IDeveloper {
	_id?: Types.ObjectId;
	name: string;
	surname: string;
	photo?: string;
	skills?: SkillType[];
	language?: LanguageType[];
	jobs?: IJob[];
}

export type SkillType = 'js' | 'php' | 'java' | 'python' | 'dart' | 'html' | 'css' | 'typeScript';

export type LanguageType = 'es' | 'en' | 'de' | 'it';

const developerSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	photo: { type: String },
	skills: {
		type: [{ type: String, index: { unique: true } }],
		enum: {
			values: ['js', 'php', 'python', 'dart', 'html', 'css', 'typeScript'],
			message: '{VALUE} no es un estado permitido'
		}
	},
	language: {
		type: [{ type: String, index: { unique: true } }],
		enum: {
			values: ['es', 'en', 'de', 'it'],
			message: '{VALUE} no es un estado permitido'
		}
	},
	jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

const DeveloperModel: Model<IDeveloper> = mongoose.models.Developer || mongoose.model('Developer', developerSchema);

export default DeveloperModel;
