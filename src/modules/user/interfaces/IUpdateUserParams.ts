import { UserRoles } from '@prisma/client';

export default interface IUpdateUserParams {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	password?: string;
	role?: UserRoles;
}
