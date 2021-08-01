import { Request, Response } from 'express';
import { ListTagsService } from '../services/ListTagsService';

class ListTagsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listTagsService = new ListTagsService();

		return response.json(await listTagsService.execute());
	}
}

export { ListTagsController };
