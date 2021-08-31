// dependencies
import { Router } from 'express';
import multer from 'multer';

// services
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarServices';

// middlewares
import ensureAuthenticated from '../middleware/ensureAuthenticated';

// configs
import uploadsConfig from '../config/uploads';

const usersRouter = Router();
const upload = multer(uploadsConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateAvatarService();

      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  },
);

export default usersRouter;
