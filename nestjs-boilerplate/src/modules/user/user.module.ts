import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskDynamicService } from '@/share/tasks/testCronJob.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, TaskDynamicService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
