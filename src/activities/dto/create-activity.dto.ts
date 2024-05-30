import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  availableSlots: number;

  @ApiProperty()
  occupiedSlots: number;

  @ApiProperty()
  media?: string;

  @ApiProperty()
  categories?: { id: string }[];
}
