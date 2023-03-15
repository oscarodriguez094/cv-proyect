import db from '@/Back/database';
import { Developer, IDeveloper, IJob, SkillDescription, ISkillDescription } from '@/Back/models';
import { findJobById, JobDaoResponse } from '../JobDao/index';

export type SkillDescriptionDaoResponse = {
	result: boolean;
	skillDescription?: ISkillDescription;
	error?: any;
};

const getSkills = async (developer: IDeveloper): Promise<IDeveloper> => {
	const jobs = developer.jobs?.map((id) => findJobById(id.toString()));
	if (jobs?.length && jobs?.length > 0) {
		const daoJobsResponse: JobDaoResponse[] = await Promise.all(jobs);
		const daoJobs = daoJobsResponse.filter((job) => job && job.result).map((jobDao) => jobDao.job);
		developer.jobs = daoJobs as IJob[];
	}
	return developer;
};

export const findSkillsDescriptionByName = async (languageType: string): Promise<SkillDescriptionDaoResponse> => {
	try {
		db.connect();
		let skillDescription: ISkillDescription | null = await SkillDescription.findOne({ languageType });
		if (skillDescription) {
		}
		db.disconnect();
		if (!skillDescription) return { result: false, error: 'El desarrollador no existe' };
		return { result: true, skillDescription: skillDescription };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const createSkillDescription = async (skillDescription: ISkillDescription): Promise<SkillDescriptionDaoResponse> => {
	try {
		db.connect();
		const skillDescriptionDao: ISkillDescription = await new SkillDescription(skillDescription).save();
		db.disconnect();
		return { result: true, skillDescription: skillDescriptionDao };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const updateSkillDescription = async (
	skillDescriptionRequest: ISkillDescription,
	languageType: string
): Promise<SkillDescriptionDaoResponse> => {
	try {
		db.connect();
		const skillDescriptionDao: ISkillDescription | null = await SkillDescription.findOneAndUpdate(
			{ languageType },
			skillDescriptionRequest,
			{
				runValidators: true
			}
		);
		db.disconnect();
		if (!skillDescriptionDao)
			return {
				result: false,
				error: 'No existe el skill  description seleccionaddo'
			};
		return { result: true, skillDescription: skillDescriptionDao };
	} catch (e) {
		db.disconnect();
		return { result: false, error: 'No se ha podidod modificar el valor' };
	}
};

export const deleteSkillDescriptionByName = async (languageType: string): Promise<SkillDescriptionDaoResponse> => {
	db.connect();
	const skillDescriptionDao: ISkillDescription | null = await SkillDescription.findOneAndDelete({ languageType });
	db.disconnect();

	if (skillDescriptionDao) return { result: true, skillDescription: skillDescriptionDao };

	return { result: false, error: 'No desarrollador seleccionado no existe' };
};
