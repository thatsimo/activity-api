import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './entities/category.entity';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.persistAndFlush(category);
      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid field');
    }
  }

  findCategoriesByIds(ids: string[]) {
    return this.categoryRepository.find({ id: { $in: ids } });
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    try {
      return await this.categoryRepository.findOneOrFail({ id });
    } catch (error) {
      throw new BadRequestException('Category not found');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    wrap(category).assign(updateCategoryDto);
    await this.categoryRepository.flush();
    return category;
  }

  remove(id: string) {
    return this.categoryRepository.nativeDelete({ id });
  }
}
