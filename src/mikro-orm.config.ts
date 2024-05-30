import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { BaseRepository } from './shared/base.repository';

export default defineConfig({
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{ts,js}',
    emit: 'ts',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
  },
  clientUrl: process.env.MIKRO_ORM_CLIENT_URL,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  allowGlobalContext: true,
  entityRepository: BaseRepository,
  extensions: [Migrator],
});
