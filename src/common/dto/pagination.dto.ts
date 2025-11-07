import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Type(() => Number)
  @Max(50)
  @Min(0)
  @IsOptional()
  limit: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset: number;
}
