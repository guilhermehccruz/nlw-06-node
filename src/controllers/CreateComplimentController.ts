import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { tag_id, user_receiver, message } = request.body;
			const { user_id } = request;

			const createComplimentService = new CreateComplimentService();

			const compliment = await createComplimentService.execute({
				tag_id,
				user_sender: user_id,
				user_receiver,
				message,
			});

			return response.status(201).json(compliment);
		} catch (err) {
			return response.status(400).json({
				error: err,
			});
		}
	}
}

export { CreateComplimentController };
