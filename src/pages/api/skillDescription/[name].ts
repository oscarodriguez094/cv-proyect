import type { NextApiRequest, NextApiResponse } from 'next';
import {
	findSkillDescriptionService,
	DataSkillDescription,
	updateSkillDescriptionService,
	deleteSkillDescriptionByIdService
} from '@/Back/Services';

interface Query {
	name: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse<DataSkillDescription>) => {
	const { name } = req.query as unknown as Query;
	switch (req.method) {
		case 'GET':
			return await findSkillDescriptionService(res, name);
		case 'PATCH':
			return await updateSkillDescriptionService(req, res, name);
		case 'DELETE':
			return await deleteSkillDescriptionByIdService(name, res);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
