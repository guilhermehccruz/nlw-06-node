import { Request, Response } from 'express';
import { ListUserSentComplimentsService } from '../services/ListUserSentComplimentsService';

class ListUserSentComplimentsController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listUserSentComplimentsService =
				new ListUserSentComplimentsService();

			const compliments = await listUserSentComplimentsService.execute(
				request.user_id
			);

			return response.status(200).json(compliments);
		} catch (err) {
			return response.status(500).json({
				error: err,
			});
		}
	}
}

export { ListUserSentComplimentsController };
