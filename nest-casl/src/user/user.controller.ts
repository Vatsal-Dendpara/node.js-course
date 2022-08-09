import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { User } from './entities/user.entity';
import { CheckAbilities, ReadUserAbility } from 'src/ability/ability.decorator';
import { AbilityGuard } from 'src/ability/ability.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = { id: 1, isAdmin: false, orgId: 1 };
    const ability = this.abilityFactory.defineAbility(user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Not an admin')
        .throwUnlessCan(Action.Create, User);
      return this.userService.create(createUserDto);
    } catch (e) {
      if (e instanceof ForbiddenError) {
        throw new ForbiddenException(e.message);
      }
    }
  }

  @Get()
  @CheckAbilities(new ReadUserAbility())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckAbilities(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = { id: 1, isAdmin: true, orgId: 2 };

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (e) {
      if (e instanceof ForbiddenError) {
        throw new ForbiddenException(e.message);
      }
    }
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: User })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
