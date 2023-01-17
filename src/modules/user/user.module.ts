import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [ AuthController, UserController ],
	providers: [
		AuthService,
		UserService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class UserModule {}
