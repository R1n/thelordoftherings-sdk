import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpsModule } from './common/https';
import { MovieModule } from "./movie";
import { QuoteModule } from "./quote";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make configuration values available throughout the app
    }),
    HttpsModule,
    MovieModule,
    QuoteModule
  ],
})
export class SdkModule {}
