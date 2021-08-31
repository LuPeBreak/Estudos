// dependencies
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
// configs
import uploadsConfig from '../config/uploads';
// Errors
import AppError from '../errors/AppErrors';
// models
import User from '../models/Users';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    // cria a instancia do repositorio do usuario padrao
    const userRepository = getRepository(User);
    // procura pelo usuario com o id od usuario logado
    const user = await userRepository.findOne(user_id);

    // verifica se o usuario esta autenticado
    if (!user) {
      throw new AppError('Only autenticated users can change avatar');
    }

    // verifica se ja existe um avatar se sim ele deleta o avatar antigo
    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadsConfig.directory,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // associa o novo avatar ao user
    user.avatar = avatarFileName;
    // atualiza o usuario com os dados atualizados
    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
