import {Get, Controller, Param, Query} from '@nestjs/common';
import { ApiBearerAuth } from "@nestjs/swagger";

import { Quote } from './dto/quote.dto';
import { QuoteByIdDto } from "./dto/quote.by.id.dto";
import { QuoteService } from './quote.service';
import { OAuth2Authorization } from "../common/https/decorator/auth.decorator";
import { ListDto } from "../common/https/dto/list.dto";

@Controller()
export class QuoteController {
    constructor(private readonly movieService: QuoteService) {}

    @ApiBearerAuth()
    @Get('/quote')
    async quote(@Query() params: ListDto, @OAuth2Authorization() auth: string): Promise<[Quote]> {
        return this.movieService.getQuotes(params, auth);
    }

    @ApiBearerAuth()
    @Get('/quote/:id')
    async quoteById(@Param() quote: QuoteByIdDto, @OAuth2Authorization() auth: string): Promise<any> {
        return this.movieService.getQuotesById(quote, auth);
    }
}
