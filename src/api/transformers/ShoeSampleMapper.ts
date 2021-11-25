import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IShoeSample, IUser, Promial, ResponseType } from '../../types';
import { ShoeSampleResponse } from '../controllers/responses/ShoeSampleResponse';
import { ShoeSampleBody } from '../controllers/requests/ShoeSampleBody';
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
export class ShoeSampleMapper extends Mapper<
  IShoeSample,
  ShoeSampleResponse,
  ShoeSampleBody
> {
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

  entityToResponse(
    sample: IShoeSample,
    type?: ResponseType
  ): ShoeSampleResponse {
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

  async bodyToEntity(body: ShoeSampleBody, user: IUser): Promial<IShoeSample> {
    return {
      baseModel: await this.find(this.modelService, user, body.baseModel),
      sampleModel: await this.fieldToEntityAsync(
        this.modelMapper,
        user,
        body.sampleModel
      ),
      client: await this.find(this.clientService, user, body.client),
      agent: await this.find(this.agentService, user, body.agent),
      brand: await this.find(this.brandService, user, body.brand),
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      notes: body.notes,
    };
  }
}
