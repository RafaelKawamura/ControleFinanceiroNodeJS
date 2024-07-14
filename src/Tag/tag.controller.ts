import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { resultDto } from '../Dto/result.dto';
import { TagCreateDto, TagUpdateDto } from '../Dto/Tag.Dto';

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
  async create(@Body() data: TagCreateDto): Promise<resultDto> {
    return this.tagService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() tagUpdateDto: TagUpdateDto,
  ): Promise<resultDto> {
    return this.tagService.update(id, tagUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(
    @Param('id') id: number
  ): Promise<resultDto> {
    return this.tagService.delete(id);
  }
}
