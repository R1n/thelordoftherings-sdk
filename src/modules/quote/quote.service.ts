import { Injectable } from '@nestjs/common';
import { HttpsService } from '../common/https';
import { QuoteByIdDto } from './dto/quote.by.id.dto';
import { OAuth2Authorization } from '../common/https/decorator/auth.decorator';

@Injectable()
export class QuoteService {
  private readonly url = 'quote';

  constructor(private readonly requestService: HttpsService) {}

  async getQuotes(params, @OAuth2Authorization() auth: string) {
    const response = await this.requestService.makeRequest(auth, {
          method: 'GET',
          url: this.url,
          params
        }
    );

    return response.data;
  }

  async getQuotesById(quote: QuoteByIdDto, @OAuth2Authorization() auth: string) {
    const response = await this.requestService.makeRequest(auth, {
          method: 'GET',
          url: `${this.url}/${quote.id}`,
        }
    );

    return response.data;
  }
}
