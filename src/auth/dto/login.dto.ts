import { IsNotEmpty, IsString, Matches } from "class-validator";
import { PASSWORD_REGEXP } from "./password";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  emailOrNickname: string;

  @Matches(PASSWORD_REGEXP)
  password: string;
}
