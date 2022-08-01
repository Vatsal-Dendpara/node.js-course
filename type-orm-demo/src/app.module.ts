import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'ormconfig';
import { User } from './user.entity';
import { Pet } from './pet.entity';
import { OrmRelationsModule } from './orm-relations/orm-relations.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Pet]),
    OrmRelationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
