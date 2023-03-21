import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/Back/database/mongodb';
import axios from 'axios';
import { crypto } from '@/Back/Utils';
import { randomBytes, randomUUID } from 'crypto';

export const authOptions = {
	// Configure one or more authentication providers
	secret: process.env.SECRET!,
	debug: true,
	adapter: MongoDBAdapter(clientPromise, { databaseName: 'cv-db' }),
	session: {
		strategy: 'jwt' as const,
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
		generateSessionToken: () => {
			return randomUUID?.() ?? randomBytes(32).toString('hex');
		}
	},
	providers: [
		CredentialsProvider({
			id: 'credential',
			name: 'cv-proyect',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				const res = await axios.get('http://localhost:3000/api/developer');
				const user = res.data;
				let checkPassword = false;
				console.log(credentials);
				if (credentials?.password) {
					checkPassword = await crypto.comparePassword(credentials.password, res.data.developer.password);
				}
				// If no error and we have user data, return it
				if (user.result && user && checkPassword) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			}
		})
	]
};

export default NextAuth(authOptions);
