import { Exclude } from 'class-transformer';
import { UserRoles } from '@prisma/client';

export class UserResponseDto {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;

	@Exclude()
	password: string;

	role: UserRoles;
	isBlocked: boolean;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}
