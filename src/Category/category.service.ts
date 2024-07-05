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
    const newCategory = this.categoryRepository.save(category)
    return <resultDto>{
          status: true,
          message: 'success!'+(await newCategory).category_id,
        };
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

  async delete(
    id: number
  ): Promise<resultDto> {
    return this.categoryRepository
      .delete(id)
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
}
