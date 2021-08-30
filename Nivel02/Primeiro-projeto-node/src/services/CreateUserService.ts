// dependencies
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

// model
import User from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email already used');
    }

    const hashedPassowrd = await hash(password, 14);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassowrd,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
