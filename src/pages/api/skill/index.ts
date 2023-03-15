import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSkill, createSkillService } from '../../../Back/Services/Skill/index';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataSkill>) => {
	switch (req.method) {
		case 'POST':
			return await createSkillService(res, req.body);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
