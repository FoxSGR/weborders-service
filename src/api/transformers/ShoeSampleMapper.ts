import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IShoeSample, IUser, Promial, ResponseType } from '../../types';
import { ShoeSampleDTO } from '../controllers/dto/ShoeSampleDTO';
import {
  AgentService,
  BrandService,
  ClientService,
  ShoeModelService,
} from '../services';
import { ShoeModelMapper } from './ShoeModelMapper';
import { ClientMapper } from './ClientMapper';
import { AgentMapper } from './AgentMapper';
import { BrandMapper } from './BrandMapper';

@Service()
export class ShoeSampleMapper extends Mapper<IShoeSample, ShoeSampleDTO> {
  constructor(
    private modelService: ShoeModelService,
    private modelMapper: ShoeModelMapper,
    private clientMapper: ClientMapper,
    private clientService: ClientService,
    private agentMapper: AgentMapper,
    private agentService: AgentService,
    private brandMapper: BrandMapper,
    private brandService: BrandService
  ) {
    super();
  }

  entityToResponse(sample: IShoeSample, type?: ResponseType): ShoeSampleDTO {
    return {
      id: sample.id,
      baseModel: this.fieldToResponse(this.modelMapper, sample.baseModel, type),
      sampleModel: this.fieldToResponse(
        this.modelMapper,
        sample.sampleModel,
        type
      ),
      client: this.fieldToResponse(this.clientMapper, sample.client, type),
      agent: this.fieldToResponse(this.agentMapper, sample.agent, type),
      brand: this.fieldToResponse(this.brandMapper, sample.brand, type),
      dateAsked: sample.dateAsked,
      dateDelivery: sample.dateDelivery,
      notes: sample.notes,
    };
  }

  async bodyToEntity(body: ShoeSampleDTO, user: IUser): Promial<IShoeSample> {
    return {
      baseModel: await this.find(this.modelService, user, body.baseModel?.id),
      sampleModel: await this.fieldToEntityAsync(
        this.modelMapper,
        user,
        body.sampleModel
      ),
      client: await this.find(this.clientService, user, body.client?.id),
      agent: await this.find(this.agentService, user, body.agent?.id),
      brand: await this.find(this.brandService, user, body.brand?.id),
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      notes: body.notes,
    };
  }
}
