import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Activity } from './entities/activity.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [MikroOrmModule.forFeature([Activity]), CategoriesModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
