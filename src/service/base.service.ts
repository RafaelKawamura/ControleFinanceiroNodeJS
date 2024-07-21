import { ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {
  constructor(public baseRepository: Repository<T>) {}
}
