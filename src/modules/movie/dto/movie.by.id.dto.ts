import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MovieByIdDto {
    @IsNotEmpty()
    @ApiProperty()
    id!: string;
}
