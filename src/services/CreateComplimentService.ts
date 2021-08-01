import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliments';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
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
		const complimentsRepositories = getCustomRepository(
			ComplimentsRepositories
		);
		const usersRepositories = getCustomRepository(UsersRepositories);

		if (user_sender === user_receiver) throw 'You cannot add a tag to yourself';

		if (!(await usersRepositories.findOne(user_receiver)))
			throw 'User receiver not found';

		if (
			await complimentsRepositories.find({
				where: {
					user_sender: user_sender,
					user_receiver: user_receiver,
					tag_id: tag_id,
				},
			})
		)
			throw 'You have already given this tag to that user';

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
