import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly ELASTICSEARCH_NODE;
  private readonly APIKEY;

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    this.APIKEY = this.configService.get<string>('API_KEY');
    this.ELASTICSEARCH_NODE = this.configService.get<string>('ELASTIC_HOST');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data/events')
  async genFakeEvent(@Query() { amount }) {
    return this.appService.genMultipleFakeEvent(amount);
  }

  @Get('data/conferences')
  async genFakeConferences(@Query() { amount }) {
    return this.appService.genMultipleFakeConference(amount);
  }

  @Get('data/commerce')
  async genFakeCommerceData(@Query() { amount }) {
    const dataset = this.appService.genMultipleFakeCommerceData(amount);
    // return dataset;
    return await this.appService.bulkDataToElasticsearch('commerce', dataset);
  }

  @Post('elasticsearch/bulk')
  async bulkDataToElastic(@Query() query) {
    if (!query?.index_name || !query?.amount)
      throw new BadRequestException('missing index_name or amount');
    const dataset = this.appService.genMultipleFakeCommerceData(query?.amount);
    return await this.appService.bulkDataToElasticsearch(
      query?.index_name,
      dataset,
    );
  }
}
