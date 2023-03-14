import type { NextApiRequest, NextApiResponse } from 'next';
import {
	DataDeveloper,
	findDeveloperService,
	updateDeveloperService,
	deleteDeveloperByIdService,
	createDeveloperService
} from '@/Back/Services';
import { seedDeveloper } from '@/Back/database/seed-Developer';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataDeveloper>) => {
	switch (req.method) {
		case 'GET':
			return await findDeveloperService(res, 'Óscar');
		case 'POST':
			return await createDeveloperService(res, seedDeveloper);
		case 'PATCH':
			return await updateDeveloperService(req, res);
		case 'DELETE':
			const { id } = req.body;
			return await deleteDeveloperByIdService(id, res);
		default:
			res.status(400).json({ message: 'Metodo no encontrado' });
	}
};

export default handler;
