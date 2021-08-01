import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const { user_id } = request;

	const usersRepositories = getCustomRepository(UsersRepositories);

	const { admin } = await usersRepositories.findOneOrFail(user_id);

	if (admin) {
		return next();
	}

	return response.status(403).end();
}
