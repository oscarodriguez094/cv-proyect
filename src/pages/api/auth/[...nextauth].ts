import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/Back/database/mongodb';
import axios from 'axios';

export const authOptions = {
	// Configure one or more authentication providers
	secret: process.env.SECRET!,
	debug: true,
	adapter: MongoDBAdapter(clientPromise, { databaseName: 'cv-db' }),
	providers: [
		CredentialsProvider({
			id: 'credential',
			name: 'cv-proyect',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				const res = await axios.get('http://localhost:3000/api/developer');
				const user = await res.data;
				// If no error and we have user data, return it
				if (user.result && user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			}
		})
	]
};

export default NextAuth(authOptions);
