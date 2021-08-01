import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): void | Response {
	const authToken = request.headers.authorization;

	if (!authToken) return response.status(401).end();

	const [, token] = authToken.split(' ');

	try {
		const { sub } = verify(
			token,
			'9c966837e17bd7739c00cbbef665739a'
		) as IPayload;

		request.user_id = sub;

		return next();
	} catch (error) {
		return response.status(401).end();
	}
}
