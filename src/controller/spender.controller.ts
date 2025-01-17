import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SpenderService } from '../service/spender.service';
import { Spender } from '../entity/spender.entity';
import { ResultDto } from '../dto/result.dto';
import { SpenderCreateDto, SpenderUpdateDto } from '../dto/spender.dto';

@Controller('/spender')
export class SpenderController {
  constructor(private spenderService: SpenderService) {}

  @Get('/findall')
  public async findAll(): Promise<Spender[] | null> {
    return await this.spenderService.findAll();
  }
  @Get('/findbyid/:id')
  public async findOne(@Param('id') spender_id: number): Promise<Spender> {
    const findID = await this.spenderService.findById(spender_id);
    return findID;
  }

  @Post('/create')
  async create(@Body() data: SpenderCreateDto): Promise<ResultDto> {
    return this.spenderService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() spenderUpdateDto: SpenderUpdateDto,
  ): Promise<ResultDto> {
    return this.spenderService.update(id, spenderUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<ResultDto> {
    return this.spenderService.delete(id);
  }
}
