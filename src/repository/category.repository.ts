import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { Category } from '../entity/category.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ResultDto } from 'src/dto/result.dto';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(
      categoryRepository.target,
      categoryRepository.manager,
      categoryRepository.queryRunner,
    );
  }

  async cfRestore(id: number): Promise<ResultDto> {
    return this.categoryRepository
      .restore(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Category restored!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Restoration failed: ' + error,
        };
      });
  }
}
