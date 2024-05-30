import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.persistAndFlush(user);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid field');
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('User not found');
    }
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({
      username,
    });
  }
}
