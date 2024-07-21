import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { Tag } from '../entity/tag.entity';
import { ResultDto } from '../dto/result.dto';
import { TagCreateDto, TagUpdateDto } from '../dto/tag.dto';

@Controller('/tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/findall')
  public async findAll(): Promise<Tag[] | null> {
    return await this.tagService.findAll();
  }
  @Get('/findbyid/:id')
  public async findOne(@Param('id') tag_id: number): Promise<Tag> {
    const findID = await this.tagService.findById(tag_id);
    return findID;
  }

  @Post('/create')
  async create(@Body() data: TagCreateDto): Promise<ResultDto> {
    return this.tagService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() tagUpdateDto: TagUpdateDto,
  ): Promise<ResultDto> {
    return this.tagService.update(id, tagUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<ResultDto> {
    return this.tagService.delete(id);
  }
}
