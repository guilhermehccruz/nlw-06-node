import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateRequest): Promise<string> {
		const usersRepositories = getCustomRepository(UsersRepositories);
		const user = await usersRepositories.findOne({ email });

		if (!user || !(await compare(password, user.password))) {
			throw 'Incorrect email or password';
		}

		return sign(
			{
				email: user.email,
			},
			'9c966837e17bd7739c00cbbef665739a',
			{
				subject: user.id,
				expiresIn: '1d',
			}
		);
	}
}

export { AuthenticateUserService };
