import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  phone: string;
}
