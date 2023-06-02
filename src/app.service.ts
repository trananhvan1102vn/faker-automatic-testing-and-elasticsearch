import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Conference, Event, FakeCommerce } from './app.dto';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class AppService {
  private readonly ELASTICSEARCH_NODE;
  private readonly APIKEY;

  constructor(private readonly configService: ConfigService) {
    this.APIKEY = this.configService.get<string>('API_KEY');
    this.ELASTICSEARCH_NODE = this.configService.get<string>('ELASTIC_HOST');
  }

  getHello(): string {
    return 'Hello World!';
  }
  createRandomEvent(): Event {
    const newEvent: Event = {
      title: faker.definitions.title,
      description: faker.lorem.paragraph(),
      type: 'Event',
      state: 'active',
      schedule_at: faker.date.future().toISOString(),
      course_id: faker.database.mongodbObjectId(),
      section_id: faker.helpers.arrayElements(),
      created_by: faker.database.mongodbObjectId(),
    };
    return newEvent;
  }

  createRandomConference(): Conference {
    const newConference: Conference = {
      title: faker.vehicle.manufacturer(),
      description: faker.lorem.paragraph(),
      schedule_at: faker.date.future().toISOString(),
      course_id: faker.database.mongodbObjectId(),
      section_id: faker.helpers.arrayElements(),
      created_by: faker.database.mongodbObjectId(),
      start_at: '',
      end_at: '',
    };
    return newConference;
  }

  createRandomCommerceData() {
    const newCommerce: FakeCommerce = {
      ProductId: faker.database.mongodbObjectId(),
      Country: faker.address.country(),
      CustomerID: faker.database.mongodbObjectId(),
      Description: faker.commerce.productDescription(),
      InvoiceDate: faker.date.past(1, new Date()),
      InvoiceNo: faker.database.mongodbObjectId(),
      Quantity: Number(faker.random.numeric()),
      StockCode: faker.database.mongodbObjectId(),
      UnitPrice: Number(faker.random.numeric()),
      Location: {
        City: faker.address.city(),
        Longtitude: faker.address.longitude(),
        Latitude: faker.address.latitude(),
      },
    };
    return newCommerce;
    // return { ...[{ index: {} }, newCommerce] };
  }

  async bulkDataToElasticsearch(dataset: any) {
    console.log(this.ELASTICSEARCH_NODE, this.APIKEY);
    const client = new Client({
      node: this.ELASTICSEARCH_NODE,
      auth: {
        apiKey: `${this.APIKEY}`,
      },
      tls: {
        // might be required if it's a self-signed certificate
        rejectUnauthorized: false,
      },
    });

    client
      .info()
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    const operations = dataset.flatMap((doc) => [
      { index: { _index: 'commerce' } },
      doc,
    ]);
    const bulkResponse = await client.bulk({ refresh: true, operations });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: operations[i * 2],
            document: operations[i * 2 + 1],
          });
        }
      });
      console.log(erroredDocuments);
    }

    const count = await client.count({ index: 'commerce' });
    console.log(count);
    return bulkResponse;
  }

  genMultipleFakeEvent = (n: number) =>
    faker.helpers.uniqueArray(this.createRandomEvent, n ? n : 5);

  genMultipleFakeConference = (n: number) =>
    faker.helpers.uniqueArray(this.createRandomConference, n ? n : 5);

  genMultipleFakeCommerceData = (n: number) =>
    faker.helpers.uniqueArray(this.createRandomCommerceData, n ? n : 5);
}
