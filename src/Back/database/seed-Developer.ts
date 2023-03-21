import { UserRole } from '@/Back/models';

interface SeedDeveloper {
	name: string;
	surname: string;
	email: string;
	role: UserRole;
	password: string;
}

export const seedDeveloper: SeedDeveloper = {
	name: 'Óscar',
	surname: 'Rodríguez López',
	email: 'oscar.rodriguez094@gmail.com',
	role: 'admin',
	password: '123456789'
};
