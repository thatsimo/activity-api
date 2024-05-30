import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { BaseRepository } from 'src/shared/base.repository';
import { User } from 'src/users/entities/user.entity';

@Entity({ repository: () => ActivityRepository })
export class Activity extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  location!: string;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  availableSlots!: number;

  @Property()
  occupiedSlots!: number;

  @Property({ type: 'string', nullable: true })
  mediaUrl: string | null = null;

  @ManyToMany({
    entity: () => Category,
    inversedBy: 'activities',
  })
  categories = new Collection<Category>(this);

  @ManyToMany({
    entity: () => User,
    inversedBy: 'activities',
  })
  users = new Collection<User>(this);
}

export class ActivityRepository extends BaseRepository<Activity> {}
