import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QuoteByIdDto {
    @IsNotEmpty()
    @ApiProperty()
    id!: string;
}
