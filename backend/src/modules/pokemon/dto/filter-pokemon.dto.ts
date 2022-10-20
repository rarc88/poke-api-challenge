import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterPokemonDto {
  @ApiProperty({ required: false, description: 'pokemon name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false, minimum: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;

  @ApiProperty({ required: false, minimum: 1, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit: number;
}
