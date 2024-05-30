import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ActivitiesService } from '../activities/activities.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async subscribe(id: string, username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.activitiesService.addUserToSubscription(id, user);
  }

  async unsubscribe(id: string, username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.activitiesService.removeUserFromSubscription(id, user);
  }

  async getMySubscriptions(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.activitiesService.getActivitiesByUser(user);
  }
}
