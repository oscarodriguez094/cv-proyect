import type { NextApiResponse } from 'next';

import { JobDaoResponse, findJobById, deleteJobById } from '@/Back/DAO';
import { IJob } from '@/Back/models';
import { createJob, updateJob } from '../../DAO/JobDao/index';

export type DataJob =
	| {
			message: string;
			job?: IJob;
	  }
	| JobDaoResponse;

export const findJobByIdService = async (res: NextApiResponse<DataJob>, id: string) => {
	const job: JobDaoResponse = await findJobById(id);
	return res.status(job.result ? 200 : 400).json(job);
};

export const deleteJobByIdService = async (res: NextApiResponse<DataJob>, id: string) => {
	const job: JobDaoResponse = await deleteJobById(id);
	return res.status(job.result ? 200 : 400).json(job);
};

export const createJobService = async (res: NextApiResponse<DataJob>, jobRequest: IJob) => {
	const job: JobDaoResponse = await createJob(jobRequest);
	return res.status(job.result ? 200 : 400).json(job);
};

export const updateJobService = async (res: NextApiResponse<DataJob>, jobRequest: IJob, id: string) => {
	const job: JobDaoResponse = await updateJob(id, jobRequest);
	return res.status(job.result ? 200 : 400).json(job);
};
