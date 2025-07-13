import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { PASSWORD_REGEXP } from "./password";
import { EqualsTo } from "../../lib/decorators/equal-to";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  nickname: string;

  @Matches(PASSWORD_REGEXP)
  password: string;

  @EqualsTo("password")
  confirmPassword: string;
}
