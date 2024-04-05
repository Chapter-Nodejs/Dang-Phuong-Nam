import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';
import { DatabaseModule } from './configs/database/database.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskDynamicService, TasksService } from './share/tasks/testCronJob.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    RestaurantModule,
    ScheduleModule.forRoot(),
  ],
  providers: [TasksService, TaskDynamicService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
