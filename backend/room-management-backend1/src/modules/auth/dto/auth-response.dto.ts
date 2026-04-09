import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class AuthResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  accessToken: string;
}