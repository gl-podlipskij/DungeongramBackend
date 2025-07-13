import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import User, { UserCreationAttributes } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOne(attr: UserCreationAttributes) {
    const user = this.userRepository.create(attr);
    return await this.userRepository.save(user);
  }

  async getOne(id: string) {
    return await this.userRepository.findOneBy({
      id: id,
    });
  }
  async getOneByEmailOrNickname(value: string) {
    return await this.userRepository.findOne({
      where: [{ email: value }, { nickname: value }],
    });
  }
}
