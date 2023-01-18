import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUserType } from './interfaces/IUserType';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from '../../shared/decorators/user.decorator';
import { UserRoles } from '@prisma/client';
import { UserService } from './user.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common';

@Roles(UserRoles.ADMIN, UserRoles.SUPERUSER)
@UseGuards(AuthGuard)
@ApiTags('User')
@Controller('api/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto, @User() _user: IUserType) {
		return this.userService.create(createUserDto);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.userService.update(id, updateUserDto);
	}

	@Patch('lock/:id')
	lockOrUnlock(@Param('id', ParseIntPipe) id: number) {
		return this.userService.lockOrUnlock(id);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.userService.delete(id);
	}
}
