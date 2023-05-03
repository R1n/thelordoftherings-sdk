import { Get, Query, Param, Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Movie } from './dto/movie.dto';
import { MovieByIdDto } from "./dto/movie.by.id.dto";
import { MovieService } from './movie.service';
import { OAuth2Authorization } from "../common/https/decorator/auth.decorator";
import { ListDto } from "../common/https/dto/list.dto";

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @ApiBearerAuth()
    @Get('/movie')
    async movies(@Query() params: ListDto, @OAuth2Authorization() auth: string): Promise<[Movie]> {
        return this.movieService.getMovies(params, auth);
    }

    @ApiBearerAuth()
    @Get('/movie/:id')
    async movieById(@Param() movie: MovieByIdDto, @OAuth2Authorization() auth: string): Promise<Movie> {
        return this.movieService.getMovieById(movie, auth);
    }

    @ApiBearerAuth()
    @Get('/movie/:id/quote')
    async movieQuotesById(@Param() movie: MovieByIdDto, @OAuth2Authorization() auth: string): Promise<[Movie]> {
        return this.movieService.getMovieQuotesById(movie, auth);
    }
}
