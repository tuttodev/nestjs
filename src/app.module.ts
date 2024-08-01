import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesController } from './resources/resources.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../../.env',
    }),
  ],
  controllers: [AppController, ResourcesController],
  providers: [AppService],
})
export class AppModule {}
