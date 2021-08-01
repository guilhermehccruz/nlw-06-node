import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepositories } from '../repositories/TagsRepositories';

class ListTagsService {
	async execute(): Promise<Tag[]> {
		const tagsRepositories = getCustomRepository(TagsRepositories);

		return await tagsRepositories.find();
	}
}

export { ListTagsService };
