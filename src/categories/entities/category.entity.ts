import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Activity } from 'src/activities/entities/activity.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { BaseRepository } from 'src/shared/base.repository';

@Entity({ repository: () => CategoryRepository })
export class Category extends BaseEntity {
  @Property()
  name!: string;

  @ManyToMany(() => Activity, (activity) => activity.categories, {
    hidden: true,
  })
  activities = new Collection<Activity>(this);
}

export class CategoryRepository extends BaseRepository<Category> {}
