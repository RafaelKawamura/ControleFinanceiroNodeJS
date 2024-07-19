import { Injectable } from '@nestjs/common';
import { Spender } from '../entity/spender.entity';
import { SpenderRepository } from '../repository/spender.repository';
import { BaseService } from 'src/service/base.service';
import { SpenderCreateDto, SpenderUpdateDto } from '../dto/spender.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class SpenderService extends BaseService<Spender> {
  constructor(private spenderRepository: SpenderRepository) {
    super(spenderRepository);
  }

  async findAll(): Promise<Spender[]> {
    const findAll = await this.spenderRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<Spender> {
    const findSpender = await this.spenderRepository.findOneBy({ id });
    return findSpender;
  }

  async create(data: SpenderCreateDto): Promise<ResultDto> {
    const spender = this.spenderRepository.create({
      spender_name: data.spender_name,
    });
    return await this.spenderRepository
      .save(spender)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message:
            'Spender ' + data.spender_name + ' registered on id: ' + spender.id,
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
    spenderUpdateDto: SpenderUpdateDto,
  ): Promise<ResultDto> {
    return this.spenderRepository
      .update(id, spenderUpdateDto)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Spender updated!',
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
    return this.spenderRepository
      .delete(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Spender deleted!',
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
