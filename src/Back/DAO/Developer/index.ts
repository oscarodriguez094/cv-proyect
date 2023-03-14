import db from '@/Back/database';
import { Developer, IDeveloper, IJob, SkillType, LanguageType } from '@/Back/models';
import { ObjectId } from 'mongoose';
import { findJobById, JobDaoResponse } from '../JobDao/index';

export type DeveloperDaoResponse = {
	result: boolean;
	developer?: IDeveloper;
	error?: any;
};

interface ArrayTypes {
	language?: LanguageType;
	skills?: SkillType;
}

const getDeveloperJobs = async (developer: IDeveloper): Promise<IDeveloper> => {
	const jobs = developer.jobs?.map((id) => findJobById(id.toString()));
	if (jobs?.length && jobs?.length > 0) {
		const daoJobsResponse: JobDaoResponse[] = await Promise.all(jobs);
		const daoJobs = daoJobsResponse.filter((job) => job && job.result).map((jobDao) => jobDao.job);
		developer.jobs = daoJobs as IJob[];
	}
	return developer;
};

export const findDeveloperByName = async (name: string): Promise<DeveloperDaoResponse> => {
	try {
		db.connect();
		let developer: IDeveloper | null = await Developer.findOne({
			name
		} as IDeveloper);
		if (developer) {
			developer = await getDeveloperJobs(developer);
		}
		db.disconnect();
		if (!developer) return { result: false, error: 'El desarrollador no existe' };

		return { result: true, developer: developer! };
	} catch (e) {
		db.disconnect();
		return { result: true, error: e };
	}
};

export const findDeveloperById = async (id: string): Promise<DeveloperDaoResponse> => {
	try {
		db.connect();
		let developer: IDeveloper | null = await Developer.findById(id);
		if (developer) {
			developer = await getDeveloperJobs(developer);
		}
		db.disconnect();
		if (!developer) return { result: false, error: 'El desarrollador no existe' };
		return { result: true, developer: developer! };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const createDeveloper = async (dev: IDeveloper): Promise<DeveloperDaoResponse> => {
	try {
		db.connect();
		const developer: IDeveloper = await new Developer(dev).save();
		db.disconnect();
		return { result: true, developer };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const updateDeveloperArrayDao = async (id: string, item: ArrayTypes): Promise<DeveloperDaoResponse> => {
	try {
		db.connect();
		const developer: IDeveloper | null = await Developer.findByIdAndUpdate(
			id,
			{
				$push: item
			},
			{ runValidators: true }
		);
		db.disconnect();
		if (!developer)
			return {
				result: false,
				error: 'No existe el desarrollador que quieres añadir el trabajo'
			};
		return { result: true, developer };
	} catch (e) {
		console.log(e);
		db.disconnect();
		return { result: false, error: 'No se ha podidod insertar el valor' };
	}
};

export const deleteDeveloperById = async (id: string): Promise<DeveloperDaoResponse> => {
	db.connect();
	const developer: IDeveloper | null = await Developer.findByIdAndDelete(id);
	db.disconnect();

	if (developer) return { result: true, developer };

	return { result: false, error: 'No desarrollador seleccionado no existe' };
};
