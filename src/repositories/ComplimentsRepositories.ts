import { EntityRepository, Repository } from 'typeorm';
import { Compliment } from '../entities/Compliments';

@EntityRepository(Compliment)
class ComplimentRepositories extends Repository<Compliment> {}

export { ComplimentRepositories };
