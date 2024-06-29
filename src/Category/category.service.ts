import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryCreateDto, CategoryUpdateDto } from '../Dto/Category.Dto';
import { resultDto } from '../Dto/result.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async findById(category_id: number): Promise<Category> {
    const findCategory = await this.categoryRepository.findOneBy({
      category_id,
    });
    return findCategory;
  }

  async findAll(): Promise<Category[]> {
    const findAll = await this.categoryRepository.find();
    return findAll;
  }

  async create(data: CategoryCreateDto): Promise<resultDto> {
    const category = new Category();
    category.category_name = data.category_name;
    return this.categoryRepository
      .save(category)
      .then(() => {
        return <resultDto>{
          status: true,
          message: 'success!',
        };
      })
      .catch(() => {
        return <resultDto>{
          status: false,
          message: 'category already exists!',
        };
      });
  }

  async update(
    id: number,
    categoryUpdateDto: CategoryUpdateDto,
  ): Promise<resultDto> {
    return this.categoryRepository
      .update(id, categoryUpdateDto)
      .then(() => {
        return <resultDto>{
          status: true,
          message: 'SUCCESS!',
        };
      })
      .catch(() => {
        return <resultDto>{
          status: false,
          message: 'FAIL',
        };
      });
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
