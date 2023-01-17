/* eslint-disable no-unused-expressions */
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleDestroy() {
		this.$connect;
	}

	async onModuleInit() {
		this.$disconnect;
	}
}
