import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './conctact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { OrmRelationsController } from './orm-relations.controller';
import { OrmRelationsService } from './orm-relations.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Task, Meeting, ContactInfo])],
  controllers: [OrmRelationsController],
  providers: [OrmRelationsService],
})
export class OrmRelationsModule {}
