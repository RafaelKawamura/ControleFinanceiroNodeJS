import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm/repository/Repository';

export class TagRepository extends BaseRepository<Tag> {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {
    super(
      tagRepository.target,
      tagRepository.manager,
      tagRepository.queryRunner,
    );
  }
}
