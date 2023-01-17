import { UserRoles } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	IsEmail,
	Matches,
	MinLength,
	IsEnum,
	IsOptional
} from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Exclude()
	firstName?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@Matches(/^(?:\d{3}\-){2}\d{3}$/, {
		message:
			'phone must be a valid number separated by dashes (e.g. 111-222-333)'
	})
	phone?: string;

	@IsOptional()
	@IsString()
	@MinLength(8)
	password?: string;

	@IsOptional()
	@IsEnum(UserRoles)
	role?: UserRoles;
}
