import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/category.repository';
import { BaseService } from 'src/service/base.service';
import { CategoryCreateDto, CategoryUpdateDto } from '../dto/category.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(private categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }

  async findAll(): Promise<Category[]> {
    const findAll = await this.categoryRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<Category> {
    const findCategory = await this.categoryRepository.findOneBy({ id });
    return findCategory;
  }

  async create(data: CategoryCreateDto): Promise<ResultDto> {
    const category = this.categoryRepository.create({
      category_name: data.category_name,
    });
    return await this.categoryRepository
      .save(category)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message:
            'Category ' +
            data.category_name +
            ' registered on id: ' +
            category.id,
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: 400,
          message: 'Creation failed: ' + error,
        };
      });
  }

  async update(
    id: number,
    categoryUpdateDto: CategoryUpdateDto,
  ): Promise<ResultDto> {
    return this.categoryRepository
      .update(id, categoryUpdateDto)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Category updated!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Update failed',
          data: error,
        };
      });
  }

  async delete(id: number): Promise<ResultDto> {
    return this.categoryRepository
      .softDelete(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Category deleted!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Deletion failed: ' + error,
        };
      });
  }
}
