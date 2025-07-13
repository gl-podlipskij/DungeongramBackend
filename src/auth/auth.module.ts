import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "./constant/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      global: true,
    }),
  ],
})
export class AuthModule {}
