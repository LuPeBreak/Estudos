// dependencies
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

// model
import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Invalid Email/Password combination');
    }

    const validateUserPassword = await compare(password, user.password);

    if (!validateUserPassword) {
      throw Error('Invalid Email/Password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
