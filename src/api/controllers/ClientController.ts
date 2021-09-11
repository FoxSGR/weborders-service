import { Get, JsonController, Param } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { IClient } from '../../types/IClient';
import { Page } from '../../types/Page';
import { ClientService } from '../services/ClientService';
import { ClientResponse } from './responses/ClientResponse';

@JsonController('/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/:id')
  @ResponseSchema(ClientResponse)
  findOne(@Param('id') id: string): Promise<ClientResponse> {
    return this.clientService.findOne(id);
  }

  find(): Promise<Page<IClient>> {
    return this.clientService.find();
  }
}
