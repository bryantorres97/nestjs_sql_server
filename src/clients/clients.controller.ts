import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { getError } from '../common/helpers/manage-errors.helper';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  logger = new Logger(ClientsController.name);
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Res() res: Response, @Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientsService.create(createClientDto);
      if (!client)
        throw new BadRequestException('No se ha podido crear el cliente');
      return res.json(client);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const clients = await this.clientsService.findAll();
      return res.json(clients);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const client = await this.clientsService.findOne(id);
      if (!client) throw new NotFoundException('Cliente no encontrado');
      return res.json(client);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = await this.clientsService.update(id, updateClientDto);
      if (!client) throw new NotFoundException('Cliente no encontrado');
      return res.json(client);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const client = await this.clientsService.remove(id);
      if (client.affected === 0)
        throw new NotFoundException('Cliente no encontrado');
      return res.json(client);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
