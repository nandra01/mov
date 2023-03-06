import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cast } from './cast.entity';
import { CreateCastDto } from './dto/create-cast.dto';
import { CastResponsesDTO } from './dto/responses/cast-responses.dto';
import { UpdateCastDTO } from './dto/update-cast.dto';

@Injectable()
export class CastService {
  constructor(
    @InjectRepository(Cast) 
    private readonly castRepository: Repository<Cast>,
  ) {}

  async get(
    skip: number,
    take: number,
    name?: string,
  ): Promise<CastResponsesDTO> {
    const qb = this.castRepository.createQueryBuilder('cast');
    const qbCastName = await this.castRepository
    .createQueryBuilder('cast')
    .getCount();

    let totalCast = 0;

    if (name) {
      qb.andWhere('cast.name like :name', { name: `%${name.trim()}%` });
    }
    if (!name) {
      totalCast = qbCastName
    }
    const result = await qb
    .skip(skip)
    .take(take)
    .orderBy('cast.name', 'ASC')
    .getMany();
    const castResponses = new CastResponsesDTO();
    castResponses.totalCast = totalCast;
    castResponses.casts = result;
    
    return castResponses;
  }

  getCastById(id: number): Promise<Cast> {
    return this.castRepository.findOne({ where: { id: id }});
  }

  create(castDto: CreateCastDto): Promise<Cast> {
    const cast = new Cast();
    cast.name = castDto.name;
    cast.birthday = castDto.birthday;
    cast.deadday = castDto.deadday;
    cast.rating = castDto.rating;

    if (cast.rating > 5) {
      throw new HttpException(
        `Rate cannot be greater than 5`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this.castRepository.save(cast);
  }

  async getCastName(alias: string) {
    return this.castRepository.createQueryBuilder(alias);
  }

  async update(
    id: number,
    updateCastDTO: UpdateCastDTO,
  ): Promise<Cast> {
    // const currentCast = await this.castRepository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });

    // if (!currentCast) {
    //   throw new HttpException(
    //     `cast not found`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // currentCast.name = updateCastDTO.name;
    // currentCast.birthday = updateCastDTO.birthday;
    // currentCast.deadday = updateCastDTO.deadday;
    // currentCast.rating = updateCastDTO.rating;
    // currentCast.address = updateCastDTO.address;

    // if (currentCast.rating > 5) {
    //   throw new HttpException(
    //     `Rate cannot be greater than 5`,
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }
    // return await currentCast.save();
    return;
  }

  async delete(id :number) {
    const currentCast = await this.castRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!currentCast) {
      throw new HttpException(
        `cast not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.castRepository.delete(id)
  }
}
