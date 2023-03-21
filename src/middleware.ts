import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req: NextRequest) {
	const { method } = req;

	if (method !== 'GET') {
		const session = await getToken({
			req,
			secret: process.env.SECRET,
			secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://')
		});

		if (!session)
			return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
				status: 401,
				headers: { 'content-type': 'application/json' }
			});
	}
}
