import { TaskDynamicService } from './../../share/tasks/testCronJob.service';
import { IResponseList } from '@/share/common/app.interface';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_CONFIG } from '../../configs/constant.config';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryParamDto } from './dto/query-param.dto';
import { UserDocument } from './user.model';
import { UserService } from './user.service';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'users',
})
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private taskDynamicService: TaskDynamicService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserDocument> {
    const user = await this.userService.createUser(body);
    this.taskDynamicService.createUserJob(user.name);
    return user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.getUser(id);
  }

  @Get()
  async getListUser(@Query() query: QueryParamDto): Promise<IResponseList<UserDocument>> {
    return this.userService.getListUser(query);
  }
}
