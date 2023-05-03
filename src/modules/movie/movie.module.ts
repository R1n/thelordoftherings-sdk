import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpsService } from '../common/https';

@Module({
  exports: [MovieService],
  controllers: [MovieController],
  providers: [MovieService, HttpsService],
})
export class MovieModule {}
