import * as request from 'supertest';
import { RequestObject } from 'src/automation-testing/request.object';
import { TestLogs } from 'src/automation-testing/logging';
export class SuperTestClient {
  /**
   * @param requestObject - it contains all request data.
   * @description - GET request of the path resource
   * @response - Supertest response
   */
  async get(requestObject: RequestObject): Promise<request.Response> {
    const response = await request(requestObject.baseUrl)
      .get(requestObject.resourcePath)
      .query(requestObject.queryParams)
      .set(requestObject.headers)
      .send();
    TestLogs.writeLogs(response);
    return response;
  }
  /**
   * @param requestObject - it contains all request data.
   * @description - POST request of the path resource
   * @response - Supertest response
   */
  async post(requestObject: RequestObject): Promise<request.Response> {
    const response = await request(requestObject.baseUrl)
      .post(requestObject.resourcePath)
      .set(requestObject.headers)
      .send(requestObject.payload);
    TestLogs.writeLogs(response);
    return response;
  }
  /**
   * @param requestObject - it contains all request data.
   * @description - PUT request of the path resource
   * @response - Supertest response
   */
  async put(requestObject: RequestObject): Promise<request.Response> {
    const response = await request(requestObject.baseUrl)
      .put(requestObject.resourcePath)
      .set(requestObject.headers)
      .send(requestObject.payload);
    TestLogs.writeLogs(response);
    return response;
  }
  /**
   * @param requestObject - it contains all request data.
   * @description - PATCH request of the path resource
   * @response - Supertest response
   */
  async patch(requestObject: RequestObject) {
    const response = await request(requestObject.baseUrl)
      .patch(requestObject.resourcePath)
      .set(requestObject.headers)
      .send(requestObject.payload);
    TestLogs.writeLogs(response);
    return response;
  }
  /**
   * @param requestObject - it contains all request data.
   * @description - DELETE request of the path resource
   * @response - Supertest response
   */
  async delete(requestObject: RequestObject): Promise<request.Response> {
    const response = await request(requestObject.baseUrl)
      .delete(requestObject.resourcePath)
      .set(requestObject.headers)
      .send();
    TestLogs.writeLogs(response);
    return response;
  }
}
