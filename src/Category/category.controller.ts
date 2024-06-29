import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { resultDto } from '../Dto/result.dto';
import { CategoryCreateDto, CategoryUpdateDto } from '../Dto/Category.Dto';

@Controller('/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/findall')
  public async findAll(): Promise<Category[] | null> {
    return await this.categoryService.findAll();
  }
  @Get('/findbyid/:id')
  public async findOne(@Param('id') category_id: number): Promise<Category> {
    const findID = await this.categoryService.findById(category_id);
    return findID;
  }

  @Post('/create')
  async create(@Body() data: CategoryCreateDto): Promise<resultDto> {
    return this.categoryService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() categoryUpdateDto: CategoryUpdateDto,
  ): Promise<resultDto> {
    return this.categoryService.update(id, categoryUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
