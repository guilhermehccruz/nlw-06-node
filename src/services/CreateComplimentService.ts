import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliments';
import { ComplimentRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
	tag_id: string;
	user_sender: string;
	user_receiver: string;
	message: string;
}

class CreateComplimentService {
	async execute({
		tag_id,
		user_sender,
		user_receiver,
		message,
	}: IComplimentRequest): Promise<Compliment> {
		const complimentsRepositories = getCustomRepository(ComplimentRepositories);
		const usersRepository = getCustomRepository(UsersRepositories);

		if (user_sender === user_receiver)
			throw 'User sender and user receiver can not be the same';

		if (await usersRepository.findOne(user_receiver))
			throw 'User receiver not found';

		const compliment = complimentsRepositories.create({
			tag_id,
			user_sender,
			user_receiver,
			message,
		});

		await complimentsRepositories.save(compliment);

		return compliment;
	}
}

export { CreateComplimentService };
