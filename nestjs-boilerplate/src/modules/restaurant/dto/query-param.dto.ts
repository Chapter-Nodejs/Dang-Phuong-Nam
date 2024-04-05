import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  pageSize: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  @Transform(({ value }) => value.trim())
  sortOrder: string = 'asc'; // default sort order asc

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  sortBy: string = 'createdAt'; // default sort by createdAt

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  search: string;
}

export class ParamIdDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId() // check for valid mongo id
  id: string;
}
