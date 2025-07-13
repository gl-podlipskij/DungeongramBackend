import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../user/user.service";
import User from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generatePayload(user: User) {
    return {
      token: this.jwtService.sign(user),
    };
  }
  async login(dto: LoginDto) {
    const user = await this.userService.getOneByEmailOrNickname(
      dto.emailOrNickname,
    );
    if (user === null) throw new UnauthorizedException("user not exist");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    const passwordMatches = await compare(dto.password, user.password);
    if (!passwordMatches) throw new UnauthorizedException("password not match");
    return this.generatePayload(user);
  }
  async register(dto: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    const hashedPassword = await hash(dto.password, 10);

    const userOrError = await this.userService
      .createOne({
        email: dto.email,
        nickname: dto.nickname,
        password: hashedPassword as string,
      })
      .catch((err: Error) => err);

    if (userOrError instanceof Error) {
      throw new UnauthorizedException("user with this email already exists");
    }
    return this.generatePayload(userOrError);
  }
}
