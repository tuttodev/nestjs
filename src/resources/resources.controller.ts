import { Body, Controller, Get, Post } from '@nestjs/common';
import { MongoDBFactory } from '../../../../shared/MongoDBFactory';
import { MongoDBResourcesRepository } from '../../../../persistence/MongoDBResourcesRepository';
import { CreateResource } from '../../../../../application/usecases/CreateResource';
import { ConfigService } from '@nestjs/config';
import { CreateResourceDto } from './dto';
import { Resource } from '../../../../../domain/entities/Resource';
import { FindResource } from '../../../../../application/usecases/FindResources';

@Controller('resources')
export class ResourcesController {
  constructor(private configService: ConfigService) {}

  @Post()
  async createResource(
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    const uri = this.configService.get<string>('DB_URI');
    const client = await MongoDBFactory.createConnection(uri);
    const db = MongoDBFactory.getDB(client);

    const repository = new MongoDBResourcesRepository(db);
    const createResource = new CreateResource(repository);
    return await createResource.create({
      name: createResourceDto.name,
      documentationUrl: createResourceDto.documentationUrl,
    });
  }

  @Get()
  async getResources(): Promise<Resource[]> {
    const uri = this.configService.get<string>('DB_URI');
    const client = await MongoDBFactory.createConnection(uri);
    const db = MongoDBFactory.getDB(client);

    const repository = new MongoDBResourcesRepository(db);
    const findResources = new FindResource(repository);
    return await findResources.find();
  }
}
