import { Injectable } from '@nestjs/common';
import { Tag } from '../entity/tag.entity';
import { TagRepository } from '../repository/tag.repository';
import { BaseService } from 'src/service/base.service';
import { TagCreateDto, TagUpdateDto } from '../dto/tag.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class TagService extends BaseService<Tag> {
  constructor(private tagRepository: TagRepository) {
    super(tagRepository);
  }

  async findAll(): Promise<Tag[]> {
    const findAll = await this.tagRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<Tag> {
    const findTag = await this.tagRepository.findOneBy({ id });
    return findTag;
  }

  async create(data: TagCreateDto): Promise<ResultDto> {
    const tag = this.tagRepository.create({
      tag_name: data.tag_name,
    });
    return await this.tagRepository
      .save(tag)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Tag ' + data.tag_name + ' registered on id: ' + tag.id,
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: 400,
          message: 'Creation failed: ' + error,
        };
      });
  }

  async update(id: number, tagUpdateDto: TagUpdateDto): Promise<ResultDto> {
    return this.tagRepository
      .update(id, tagUpdateDto)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Tag updated!',
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
    return this.tagRepository
      .delete(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Tag deleted!',
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
