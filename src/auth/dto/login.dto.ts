import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export type JwtPayload = {
  username: string;
};

export type RequestContext = {
  user: JwtPayload;
};
