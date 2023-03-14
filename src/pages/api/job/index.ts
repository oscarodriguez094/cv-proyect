import type { NextApiRequest, NextApiResponse } from 'next';
import { DataJob, createJobService } from '../../../Back/Services/Job/index';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataJob>) => {
	switch (req.method) {
		case 'POST':
			return await createJobService(res, req.body);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
