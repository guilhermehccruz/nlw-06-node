import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController =
	new ListUserReceivedComplimentsController();
const listUserSentComplimentsController =
	new ListUserSentComplimentsController();
const listTagsController = new ListTagsController();

// * Routes
router.post('/login', authenticateUserController.handle);

// * Users
router.post('/users', ensureAuthenticated, createUserController.handle);
router.get(
	'/users/received/compliments',
	ensureAuthenticated,
	listUserReceivedComplimentsController.handle
);
router.get(
	'/users/sent/compliments',
	ensureAuthenticated,
	listUserSentComplimentsController.handle
);

// * Tags
router.post(
	'/tags',
	ensureAuthenticated,
	ensureAdmin,
	createTagController.handle
);
router.get('/tags', ensureAuthenticated, listTagsController.handle);

// * Compliments
router.post(
	'/compliments',
	ensureAuthenticated,
	createComplimentController.handle
);

export { router };
