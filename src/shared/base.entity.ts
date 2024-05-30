import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id!: string;
}
