import { AnyEntity, EntityRepository, EntityManager } from '@mikro-orm/core';

export class BaseRepository<T extends object> extends EntityRepository<T> {
  protected entityName!: string;

  constructor(em: EntityManager, entity: { new (): T }) {
    super(em, entity);
  }

  persist(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.persist(entity);
  }

  async persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
    return await this.em.persistAndFlush(entity);
  }

  remove(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.remove(entity);
  }

  async removeAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
    return await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    return await this.em.flush();
  }
}
