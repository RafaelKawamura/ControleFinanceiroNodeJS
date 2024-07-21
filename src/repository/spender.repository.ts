import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { Spender } from '../entity/spender.entity';
import { Repository } from 'typeorm/repository/Repository';

export class SpenderRepository extends BaseRepository<Spender> {
  constructor(
    @InjectRepository(Spender)
    private spenderRepository: Repository<Spender>,
  ) {
    super(
      spenderRepository.target,
      spenderRepository.manager,
      spenderRepository.queryRunner,
    );
  }
}
