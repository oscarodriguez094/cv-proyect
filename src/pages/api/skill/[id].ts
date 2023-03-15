import type { NextApiRequest, NextApiResponse } from 'next';
import { DataJob, findJobByIdService, deleteJobByIdService, updateJobService, DataSkill } from '@/Back/Services';
import { findSkillByIdService, updateSkillService, deleteSkillByIdService } from '../../../Back/Services/Skill/index';

interface Query {
	id: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse<DataSkill>) => {
	const { id } = req.query as unknown as Query;
	switch (req.method) {
		case 'GET':
			return await findSkillByIdService(res, id);
		case 'PATCH':
			return await updateSkillService(res, req.body, id);
		case 'DELETE':
			return await deleteSkillByIdService(res, id);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
