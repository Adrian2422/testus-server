import * as jwt from 'jsonwebtoken';
import IJWTPayload from '../../modules/user/interfaces/IJWTPayload';
import { PrismaService } from '../../prisma/prisma.service';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly prismaService: PrismaService
	) {}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.getAllAndOverride('roles', [
			context.getHandler(),
			context.getClass()
		]);

		if (roles?.length) {
			const request = context.switchToHttp().getRequest();
			const token = request.headers?.authorization?.split('Bearer ')[1];
			try {
				const { id } = (await jwt.verify(
					token,
					process.env.JSON_TOKEN_KEY
				)) as IJWTPayload;
				const user = await this.prismaService.user.findUnique({
					where: {
						id
					}
				});

				if (!user) {
					return false;
				}

				if (roles.includes(user.role)) {
					return true;
				}

				return false;
			} catch (error) {
				return false;
			}
		}

		return true;
	}
}
