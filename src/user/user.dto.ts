// src/user/user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from './user.entity';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: UserType,
    default: UserType.USER,
    description: 'This is a required property',
  })
  @IsEnum(UserType)
  type: UserType;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
