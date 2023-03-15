import type { NextApiRequest, NextApiResponse } from 'next';

import {
	findDeveloperByName,
	DeveloperDaoResponse,
	findDeveloperById,
	updateDeveloperArrayDao,
	deleteDeveloperById,
	createDeveloper
} from '@/Back/DAO';
import { IDeveloper, IJob, LanguageType, SkillType } from '@/Back/models';

export type DataDeveloper =
	| {
			message: string;
			developer?: IDeveloper;
	  }
	| DeveloperDaoResponse
	| null;

export type UpdateBody = {
	jobs?: IJob[];
	languages?: LanguageType[];
	skills?: SkillType[];
	name: string;
};

export const findDeveloperService = async (res: NextApiResponse<DataDeveloper>, name: string) => {
	const developer = await findDeveloperByName(name);
	if (developer.result) return res.status(200).json(developer);
	return res.status(400).json({ message: developer.error });
};

export const createDeveloperService = async (res: NextApiResponse<DataDeveloper>, developer: IDeveloper) => {
	const developerDao: DeveloperDaoResponse = await findDeveloperByName(developer.name);
	if (!developerDao.result) {
		await createDeveloper(developer);
		return res.status(201).json({ message: 'se ha creado el desarrollador' });
	}
	return res.status(400).json({ message: developerDao.error });
};

export const updateDeveloperService = async (req: NextApiRequest, res: NextApiResponse<DataDeveloper>) => {
	const { language, skills, id } = req.body;
	let developer: DeveloperDaoResponse = {
		result: false,
		error: 'ya existe la propiedad que quieres añadir'
	};
	const developerDao: DeveloperDaoResponse = await findDeveloperById(id);
	if (developerDao.developer && language && !developerDao.developer?.language?.includes(language))
		developer = await updateDeveloperArrayDao(id, {
			language
		});
	if (developerDao.developer && skills && !developerDao.developer?.skills?.includes(skills))
		developer = await updateDeveloperArrayDao(id, {
			skills
		});

	return res.status(developerDao && developer.result ? 200 : 400).json(developer);
};

export const deleteDeveloperByIdService = async (id: string, res: NextApiResponse<DataDeveloper>) => {
	const developer: DeveloperDaoResponse = await deleteDeveloperById(id);
	return res.status(developer.result ? 200 : 400).json(developer);
};