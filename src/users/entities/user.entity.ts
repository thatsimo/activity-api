import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Activity } from 'src/activities/entities/activity.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { BaseRepository } from 'src/shared/base.repository';

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @ManyToMany(() => Activity, (activity) => activity.users)
  activities = new Collection<Activity>(this);
}

export class UserRepository extends BaseRepository<User> {}
