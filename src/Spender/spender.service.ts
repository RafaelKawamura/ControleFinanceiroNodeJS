import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Spender } from './spender.entity';
import { SpenderCreateDto,SpenderUpdateDto } from 'src/Dto/Spender.Dto';
import { resultDto } from '../Dto/result.dto';

@Injectable()
export class SpenderService {
  constructor(
    @Inject('SPENDER_REPOSITORY')
    private spenderRepository: Repository<Spender>,
  ) {}

  async findById(spender_id: number): Promise<Spender> {
    const findSpender = await this.spenderRepository.findOneBy({
      spender_id,
    });
    return findSpender;
  }

  async findAll(): Promise<Spender[]> {
    const findAll = await this.spenderRepository.find();
    return findAll;
  }

  async create(data: SpenderCreateDto): Promise<resultDto> {
    const spender = new Spender();
    spender.spender_name = data.spender_name;
    return this.spenderRepository
      .save(spender)
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
    spenderUpdateDto: SpenderUpdateDto,
  ): Promise<resultDto> {
    return this.spenderRepository
      .update(id, spenderUpdateDto)
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
    return this.spenderRepository
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
      });;
  }
}
