import { Request, Response } from 'express';
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService';

class ListUserReceivedComplimentsController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listUserReceivedComplimentsService =
				new ListUserReceivedComplimentsService();

			const compliments = await listUserReceivedComplimentsService.execute(
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

export { ListUserReceivedComplimentsController };
