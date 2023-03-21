import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req: NextRequest) {
	const { method } = req;
	if (method !== 'GET') {
		const session = await getToken({
			req,
			secret: process.env.SECRET
		});
		
		if (!session)
			return new NextResponse(JSON.stringify({ result: false, message: 'authentication failed' }), {
				status: 401,
				headers: { 'content-type': 'application/json' }
			});
	}
}

export const config = {
	matcher: [
		'/api/developer',
		'/api/job/:id*',
		'/api/job',
		'/api/skill',
		'/api/skill/:id*',
		'/api/skillDescription/:name*',
		'/api/skillDescription'
	]
};
