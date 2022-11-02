import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: number) {
    return await this.clientRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const currentClient = await this.clientRepository.preload({
      id,
      ...updateClientDto,
    });

    if (!currentClient) return null;

    return await this.clientRepository.save(currentClient);
  }

  async remove(id: number) {
    return await this.clientRepository.delete({
      id,
    });
  }
}
