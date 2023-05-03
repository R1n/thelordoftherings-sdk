import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { HttpsService } from '../common/https';

@Module({
  exports: [QuoteService],
  controllers: [QuoteController],
  providers: [QuoteService, HttpsService],
})
export class QuoteModule {}
