import { Body, Controller, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Patch("login")
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
