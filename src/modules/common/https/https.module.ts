import { Global, Module } from '@nestjs/common';
import { HttpsService } from './https.service';

@Global()
@Module({
  providers: [HttpsService],
  exports: [HttpsService],
})
export class HttpsModule {}
