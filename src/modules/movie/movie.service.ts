import { Injectable } from '@nestjs/common';
import { HttpsService } from '../common/https';
import { MovieByIdDto } from './dto/movie.by.id.dto';
import { OAuth2Authorization } from '../common/https/decorator/auth.decorator';
import {ListDto} from "../common/https/dto/list.dto";

@Injectable()
export class MovieService {
  private readonly url = 'movie';

  constructor(private readonly requestService: HttpsService) {}

  async getMovies(params: ListDto, @OAuth2Authorization() auth: string) {
    const response = await this.requestService.makeRequest(auth, {
          method: 'GET',
          url: this.url,
          params
        }
    );

    return response.data;
  }

  async getMovieQuotesById(movie: MovieByIdDto, @OAuth2Authorization() auth: string) {
      const response = await this.requestService.makeRequest(auth, {
          method: 'GET',
          url: `${this.url}/${movie.id}/quote`,
        }
    );

    return response.data;
  }

    async getMovieById(movie: MovieByIdDto, @OAuth2Authorization() auth: string) {
      const response = await this.requestService.makeRequest(auth, {
                method: 'GET',
                url: `${this.url}/${movie.id}`,
            }
        );

        return response.data;
    }
}
