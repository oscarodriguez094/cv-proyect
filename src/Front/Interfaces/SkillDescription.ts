import { Skill } from '@/Front/Interfaces';

export interface SkillDescription {
	_id?: string;
	title: string;
	description: string;
	languageType: string;
	skills?: Skill[];
}
