import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagCreateDto, TagUpdateDto } from '../Dto/Tag.Dto';
import { resultDto } from '../Dto/result.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private tagRepository: Repository<Tag>,
  ) {}

  async findById(tag_id: number): Promise<Tag> {
    const findTag = await this.tagRepository.findOneBy({
      tag_id,
    });
    return findTag;
  }

  async findAll(): Promise<Tag[]> {
    const findAll = await this.tagRepository.find();
    return findAll;
  }

  async create(data: TagCreateDto): Promise<resultDto> {
    const tag = new Tag();
    tag.tag_name = data.tag_name;
    try{
      const newTag = this.tagRepository.save(tag)
      return <resultDto>{
        status: 201,
        message: 'Tag '+data.tag_name+' registered on id: '+(await newTag).tag_id,
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
    tagUpdateDto: TagUpdateDto,
  ): Promise<resultDto> {
    return this.tagRepository
      .update(id, tagUpdateDto)
      .then(() => {
        return <resultDto>{
          status: 201,
          message: 'Tag updated!',
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
    return this.tagRepository
      .delete(id)
      .then(() => {
        return <resultDto>{
          status: 201,
          message: 'Tag deleted!',
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
