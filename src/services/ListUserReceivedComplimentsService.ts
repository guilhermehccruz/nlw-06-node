import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliments';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserReceivedComplimentsService {
	async execute(user_id: string): Promise<Compliment[]> {
		const complimentsRepositories = getCustomRepository(
			ComplimentsRepositories
		);

		const compliments = await complimentsRepositories.find({
			where: { user_receiver: user_id },
		});

		return compliments;
	}
}

export { ListUserReceivedComplimentsService };
