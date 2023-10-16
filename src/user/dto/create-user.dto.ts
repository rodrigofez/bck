import { Role } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsString()
  dui: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  position: string;

  @IsDateString()
  startDate: Date;
}
