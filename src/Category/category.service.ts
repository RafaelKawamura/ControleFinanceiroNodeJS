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
    try{
      const newCategory = this.categoryRepository.save(category)
      return <resultDto>{
        status: 201,
        message: 'Category '+data.category_name+' registered on id: '+(await newCategory).category_id,
      }
    }
    catch(error:any){
      return <resultDto>{
        status: 400,
        message: 'Creation failed: '+error
      }
    }
  }

  async update(
    id: number,
    categoryUpdateDto: CategoryUpdateDto,
  ): Promise<resultDto> {
    return this.categoryRepository
      .update(id, categoryUpdateDto)
      .then(() => {
        return <resultDto>{
          status: 201,
          message: 'Category updated!',
        };
      })
      .catch((error:any) => {
        return <resultDto>{
          status: 400,
          message: 'Update failed',
          data: error
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
          status: 201,
          message: 'Category deleted!',
        };
      })
      .catch((error:any) => {
        return <resultDto>{
          status: 400,
          message: 'Deletion failed: '+error,
        };
      });
  }
}
