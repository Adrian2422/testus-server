import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/createUser.dto';
import IUpdateUserParams from './interfaces/IUpdateUserParams';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dtos/userResponse.dto';
import {
	ClassSerializerInterceptor,
	ConflictException,
	Injectable,
	NotFoundException,
	UseInterceptors
} from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(): Promise<UserResponseDto[]> {
		return await (
			await this.prismaService.user.findMany()
		).map((user) => new UserResponseDto(user));
	}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		return new UserResponseDto(user);
	}

	async create({
		firstName,
		lastName,
		email,
		phone,
		password,
		role
	}: CreateUserDto) {
		const userExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (userExists) {
			throw new ConflictException();
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return await this.prismaService.user.create({
			data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password: hashedPassword,
				role,
			}
		});
	}

	async update(
		id: number,
		{ firstName, lastName, email, phone, role }: IUpdateUserParams
	): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		const updatedUser = await this.prismaService.user.update({
			where: {
				id
			},
			data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				role
			}
		});

		return new UserResponseDto(updatedUser);
	}

	async lockOrUnlock(id: number) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		const lockedUser = await this.prismaService.user.update({
			where: {
				id
			},
			data: {
				is_blocked: !user.is_blocked
			}
		});

		return new UserResponseDto(lockedUser);
	}

	async delete(id: number) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		const deletedUser = await this.prismaService.user.delete({
			where: {
				id
			}
		});

		return new UserResponseDto(deletedUser);
	}
}
