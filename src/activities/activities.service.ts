import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityRepository } from './entities/activity.entity';
import { CategoriesService } from '../categories/categories.service';
import { wrap } from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger(ActivitiesService.name);
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const activity = this.activityRepository.create(createActivityDto);
      await this.activityRepository.persistAndFlush(activity);
      return activity;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid field');
    }
  }

  async findAll(
    name?: string,
    startDate?: string,
    endDate?: string,
    isAvailable?: boolean,
  ) {
    try {
      return await this.activityRepository.findAll({
        where: {
          ...(name && { name }),
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(isAvailable && {
            $and: [
              { availableSlots: { $gt: 0 } },
              {
                endDate: {
                  $gt: new Date(),
                },
              },
            ],
          }),
        },
        populate: ['categories', 'users'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid filter');
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityRepository.findOneOrFail(
        { id },
        { populate: ['categories', 'users'] },
      );
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Activity not found');
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.findOne(id);
    try {
      const { categories, ...rest } = updateActivityDto;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      wrap(activity).assign(rest);

      if (categories) {
        const dbCategories = await this.categoriesService.findCategoriesByIds(
          categories.map(({ id }) => id),
        );

        if (dbCategories.length !== categories.length) {
          throw new BadRequestException('Invalid categories');
        }

        activity.categories.set(dbCategories);
      }

      await this.activityRepository.flush();
      return activity;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid field');
    }
  }

  remove(id: string) {
    return this.activityRepository.nativeDelete({ id });
  }

  getActivitiesByUser(user: User) {
    return this.activityRepository.findAll({
      where: {
        users: {
          $some: {
            id: user.id,
          },
        },
      },
    });
  }

  async addUserToSubscription(id: string, user: User) {
    const activity = await this.findOne(id);
    if (activity.availableSlots <= 0) {
      throw new BadRequestException('No available slots');
    }
    activity.users.add(user);
    activity.availableSlots -= 1;
    activity.occupiedSlots += 1;
    await this.activityRepository.flush();
    return activity;
  }

  async removeUserFromSubscription(id: string, user: User) {
    const activity = await this.findOne(id);
    if (!activity.users.contains(user)) {
      throw new BadRequestException('User not subscribed');
    }
    activity.users.remove(user);
    activity.availableSlots += 1;
    activity.occupiedSlots -= 1;
    await this.activityRepository.flush();
    return activity;
  }
}
