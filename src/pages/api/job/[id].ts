import type { NextApiRequest, NextApiResponse } from 'next';
import { DataJob, findJobByIdService, deleteJobByIdService, updateJobService } from '@/Back/Services';

interface Query {
	id: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse<DataJob>) => {
	const { id } = req.query as unknown as Query;
	switch (req.method) {
		case 'GET':
			return await findJobByIdService(res, id);
		case 'PATCH':
			return await updateJobService(res, req.body, id);
		case 'DELETE':
			return await deleteJobByIdService(res, id);
		default:
			res.status(400).json({ message: 'metodo no encontrado' });
	}
};

export default handler;
