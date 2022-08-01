import { Controller, Get } from '@nestjs/common';
import { OrmRelationsService } from './orm-relations.service';

@Controller('orm-relations')
export class OrmRelationsController {
  constructor(private readonly ormService: OrmRelationsService) {}

  @Get()
  async testOrm(): Promise<any> {
    // await this.ormService.seed();
    return this.ormService.deleteEmployee(2);
  }
}
