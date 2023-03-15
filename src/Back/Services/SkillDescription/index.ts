import type { NextApiRequest, NextApiResponse } from 'next';

import { ISkillDescription } from '@/Back/models';
import { LanguageType } from '../../models/Developer';
import { deleteSkillDescriptionByName } from '../../DAO/SkillDescription/index';
import {
	updateSkillDescription,
	findSkillsDescriptionByName,
	SkillDescriptionDaoResponse,
	createSkillDescription,
} from '@/Back/DAO';

export type DataSkillDescription =
	| {
			message: string;
			skillDescription?: ISkillDescription;
	  }
	| SkillDescriptionDaoResponse
	| null;

export const findSkillDescriptionService = async (res: NextApiResponse<DataSkillDescription>, name: string) => {
	const SkillDescription = await findSkillsDescriptionByName(name);
	if (SkillDescription.result) return res.status(200).json(SkillDescription);
	return res.status(400).json({ message: SkillDescription.error });
};

export const createSkillDescriptionService = async (res: NextApiResponse<DataSkillDescription>, skill: ISkillDescription) => {
	const SkillDescriptionDaoResponse: SkillDescriptionDaoResponse = await findSkillsDescriptionByName(skill.languageType);
	if (!SkillDescriptionDaoResponse.result) {
		const skillDescription = await createSkillDescription(skill);
		return res.status(201).json(skillDescription);
	}
	return res.status(400).json({ message: 'No se ha podido crear la skill' });
};

export const updateSkillDescriptionService = async (req: NextApiRequest, res: NextApiResponse<DataSkillDescription>, name: string) => {
	let skillDescription: SkillDescriptionDaoResponse = {
		result: false,
		error: 'ya existe la propiedad que quieres añadir'
	};
	const skillDescriptionDao: SkillDescriptionDaoResponse = await findSkillsDescriptionByName(name);
	if (skillDescriptionDao.result) skillDescription = await updateSkillDescription(req.body, name);

	return res.status(skillDescriptionDao && skillDescriptionDao.result ? 200 : 400).json(skillDescription);
};

export const deleteSkillDescriptionByIdService = async (name: string, res: NextApiResponse<DataSkillDescription>) => {
	const skillDescription: SkillDescriptionDaoResponse = await deleteSkillDescriptionByName(name);
	return res.status(skillDescription.result ? 200 : 400).json(skillDescription);
};
