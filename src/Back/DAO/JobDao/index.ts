import db from '../../database';
import { Job, IJob } from '../../models';
import { Developer, IDeveloper } from '@/Back/models';
import { updateDeveloperArrayDao } from '../Developer';
import { getConnection } from '@/Back/database/db';
import mongoose from 'mongoose';

export type JobDaoResponse = {
	result: boolean;
	job?: IJob;
	error?: any;
};
export const createJob = async (job: IJob): Promise<JobDaoResponse> => {
	try {
		const transaction = async (): Promise<IJob | null> => {
			try {
				const jobDao: IJob = await new Job(job).save({ session });
				const developer: IDeveloper | null = await Developer.findByIdAndUpdate(
					job.developerId,
					{
						$push: { jobs: jobDao }
					},
					{ runValidators: true }
				).session(session);
				if (developer) {
					await session.commitTransaction();
					return jobDao;
				}
				await session.abortTransaction();
				return null;
			} catch (e) {
				await session.abortTransaction();
				return null;
			}
		};
		db.connect();
		const session = await mongoose.startSession();
		session.startTransaction();
		const jobDao: IJob | null = await transaction();
		session.endSession();
		db.disconnect();
		if (jobDao) return { result: true, job: jobDao };
		return { result: false, error: 'No se ha podido actualizar' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const findJobById = async (id: string): Promise<JobDaoResponse> => {
	try {
		db.connect();
		const jobDao: IJob | null = await Job.findById(id);
		db.disconnect();
		if (jobDao) return { result: true, job: jobDao };
		return { result: false, error: 'El trabajo que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const updateJob = async (id: string, jobRequest: IJob): Promise<JobDaoResponse> => {
	try {
		db.connect();
		const jobUpdated: IJob | null = await Job.findByIdAndUpdate(id, jobRequest, { runValidators: true, upsert: true });
		db.disconnect();
		if (jobUpdated) return { result: true, job: jobUpdated! };

		return { result: false, error: 'El trabajo que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const deleteJobById = async (id: string): Promise<JobDaoResponse> => {
	try {
		db.connect();
		const transaction = async (): Promise<IJob | null> => {
			try {
				const job: IJob | null = await Job.findByIdAndDelete(id).session(session);
				if (job) {
					const developer: IDeveloper | null = await Developer.findByIdAndUpdate(
						job.developerId,
						{
							$pullAll: {
								jobs: [job._id]
							}
						},
						{ new: true }
					).session(session);
					if (developer && developer.jobs && !developer?.jobs.filter((item) => item._id.toString() === job._id.toString()).length) {
						await session.commitTransaction();
						return job;
					}
				}
				await session.abortTransaction();
				return null;
			} catch (e) {
				await session.abortTransaction();
				return null;
			}
		};
		db.connect();
		const session = await mongoose.startSession();
		session.startTransaction();
		const jobDeleted: IJob | null = await transaction();
		session.endSession();
		db.disconnect();

		if (jobDeleted) return { result: true, job: jobDeleted };

		return { result: false, error: 'El trabajo que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};
