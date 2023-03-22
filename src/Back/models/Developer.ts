import mongoose, { Model, Schema, Types } from 'mongoose';
import { IJob } from './Job';

export interface IDeveloper {
	_id?: Types.ObjectId;
	name: string;
	surname: string;
	description: string;
	photo?: string;
	email: string;
	password?: string;
	phone?: number;
	address?: string;
	role?: UserRole;
	skills?: SkillType[];
	language?: LanguageType[];
	jobs: IJob[];
}

export type SkillType = 'js' | 'php' | 'java' | 'python' | 'dart' | 'html' | 'css' | 'typeScript';

export type LanguageType = 'es' | 'en' | 'de' | 'it';

export type UserRole = 'admin' | 'normal';

const developerSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	description: { type: String },
	photo: { type: String },
	email: { type: String, required: true },
	password: { type: String },
	phone: { type: Number, min: [9, 'Add phone cannot less than 9'] },
	address: { type: String },
	role: {
		type: String,
		enum: {
			values: ['admin', 'normal'],
			message: ' no es un estado permitido',
			default: 'normal'
		}
	},
	skills: {
		type: [{ type: String, index: { unique: true } }],
		enum: {
			values: ['js', 'php', 'python', 'dart', 'html', 'css', 'typeScript'],
			message: '{VALUE} no es un estado aaa permitido'
		}
	},
	language: {
		type: [{ type: String, index: { unique: true } }],
		enum: {
			values: ['es', 'en', 'de', 'it'],
			message: '{VALUE} no es un estado aaaa permitido'
		}
	},
	jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

const DeveloperModel: Model<IDeveloper> = mongoose.models.Developer || mongoose.model('Developer', developerSchema);

export default DeveloperModel;
