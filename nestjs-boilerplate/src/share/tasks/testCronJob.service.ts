import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_5_SECONDS)
  async testCronJob() {
    console.log('Cron job is running...');
  }
}

@Injectable()
export class TaskDynamicService {
  private cronJob: CronJob;

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  createUserJob(userName: string) {
    console.log('userName: ', userName);
    this.cronJob = new CronJob(CronExpression.EVERY_5_SECONDS, () => {
      console.log(`Cron job is running for user: ${userName}`);
    });
    this.schedulerRegistry.addCronJob(`dynamicCronJob_${userName}`, this.cronJob);
    this.cronJob.start();
  }

  startJob(userName: string) {
    const job = this.schedulerRegistry.getCronJob(`dynamicCronJob_${userName}`);
    job.start();
  }

  stopJob(userName: string) {
    const job = this.schedulerRegistry.getCronJob(`dynamicCronJob_${userName}`);
    job.stop();
  }

  deleteJob(userName: string) {
    this.schedulerRegistry.deleteCronJob(`dynamicCronJob_${userName}`);
  }
}
