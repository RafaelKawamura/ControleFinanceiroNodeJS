import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { Category } from '../entity/category.entity';
import { ResultDto } from '../dto/result.dto';
import { CategoryCreateDto, CategoryUpdateDto } from '../dto/category.dto';

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
  async create(@Body() data: CategoryCreateDto): Promise<ResultDto> {
    return this.categoryService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() categoryUpdateDto: CategoryUpdateDto,
  ): Promise<ResultDto> {
    return this.categoryService.update(id, categoryUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<ResultDto> {
    return this.categoryService.delete(id);
  }
}
