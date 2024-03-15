import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'address',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @Transform(({ value }) => value.trim())
  address: string;

  @ApiProperty({
    description: 'phone',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  phone: string;
}
