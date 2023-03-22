import { Job } from '@/Front/Interfaces';

export interface Developer {
	_id?: string;
	name: string;
	surname: string;
	photo?: string;
	email: string;
	password?: string;
	phone?: number;
	address: string;
	description: string;
	role?: UserRole;
	skills?: SkillType[];
	language?: LanguageType[];
	jobs?: Job[];
}

export interface DeveloperResponse {
	result: boolean;
	developer?: Developer;
	error?: string;
}

export type SkillType = 'js' | 'php' | 'java' | 'python' | 'dart' | 'html' | 'css' | 'typeScript';

export type LanguageType = 'es' | 'en' | 'de' | 'it';

export type UserRole = 'admin' | 'normal';
