import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSkillDescription, createSkillDescriptionService } from '@/Back/Services';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataSkillDescription>) => {
	switch (req.method) {
		case 'POST':
			return await createSkillDescriptionService(res, req.body);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
