import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import {
	PrismaClient,
	UserRoles
} from '@prisma/client';

const randomUsersCount = 100;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
	generateAdmin()
		.then(() => generateUsers())
		.catch((error) => console.log(error.message));
}

async function generateAdmin() {
	await prisma.user.upsert({
		where: { email: 'admin@testus.com' },
		update: {},
		create: {
			first_name: 'Admin',
			last_name: 'Nimda',
			email: 'admin@testus.com',
			password: await hashPassword('P0klik4$'),
			phone: '111-222-333',
			role: 'ADMIN',
			is_blocked: false,
		}
	});
}

async function generateUsers() {
	for (let i = 0; i < randomUsersCount; i++) {
		await prisma.user.create({
			data: {
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				password: await hashPassword('P0klik4$'),
				phone: faker.phone.number('###-###-###'),
				role: randomEnum(UserRoles),
				is_blocked: faker.datatype.boolean(),
			}
		});
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEnum<T>(targetEnum: T, numerical = false): T[keyof T] {
	const enumValues = Object.keys(targetEnum)
		.map((n) => (numerical ? Number.parseInt(n) : n))
		.filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumValue = enumValues[randomIndex];
	return randomEnumValue;
}

// EXECUTE
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
