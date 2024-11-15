import { UserModel } from '@prisma/client';
import { inject } from 'inversify';

import { IUsersRepository } from './interfaces/users.repository.interface';
import { User } from './user.entity';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async createUser({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	async findByEmail(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
