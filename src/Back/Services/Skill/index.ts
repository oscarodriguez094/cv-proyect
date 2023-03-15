import type { NextApiResponse } from 'next';

import { JobDaoResponse, findJobById, deleteJobById } from '@/Back/DAO';
import { IJob } from '@/Back/models';
import { createJob, updateJob } from '../../DAO/JobDao/index';
import { ISkill } from '../../models/Skill';
import { SkillDaoResponse, findSkillById, deleteSkillById, createSkill, updateSkill } from '../../DAO/Skill/index';

export type DataSkill =
	| {
			message: string;
			skill?: ISkill;
	  }
	| SkillDaoResponse;

export const findSkillByIdService = async (res: NextApiResponse<DataSkill>, id: string) => {
	const skill: SkillDaoResponse = await findSkillById(id);
	return res.status(skill.result ? 200 : 400).json(skill);
};

export const deleteSkillByIdService = async (res: NextApiResponse<DataSkill>, id: string) => {
	const skill: SkillDaoResponse = await deleteSkillById(id);
	return res.status(skill.result ? 200 : 400).json(skill);
};

export const createSkillService = async (res: NextApiResponse<DataSkill>, skillRequest: ISkill) => {
	const skill: SkillDaoResponse = await createSkill(skillRequest);
	return res.status(skill.result ? 200 : 400).json(skill);
};

export const updateSkillService = async (res: NextApiResponse<DataSkill>, skillRequest: ISkill, id: string) => {
	const skill: SkillDaoResponse = await updateSkill(id, skillRequest);
	return res.status(skill.result ? 200 : 400).json(skill);
};
