import { UserRoles } from '@prisma/client';
import {
	IsString,
	IsNotEmpty,
	IsEmail,
	Matches,
	MinLength,
	IsEnum
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	email: string;

	@Matches(/^(?:\d{3}\-){2}\d{3}$/, {
		message:
			'phone must be a valid number separated by dashes (e.g. 111-222-333)'
	})
	phone: string;

	@IsString()
	@MinLength(8)
	password: string;

	@IsEnum(UserRoles)
	role: UserRoles;
}
