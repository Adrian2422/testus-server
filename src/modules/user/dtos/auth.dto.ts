import { UserRoles } from '@prisma/client';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength
} from 'class-validator';

export class SignupDto {
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

export class SigninDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
