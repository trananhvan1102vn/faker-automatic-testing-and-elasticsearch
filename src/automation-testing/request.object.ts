export interface RequestObject {
  baseUrl?: string;
  resourcePath?: string;
  queryParams?: any;
  headers?: any;
  payload?: any;
}

export class RequestObjectBuilder {
  private readonly _requestObject: RequestObject;

  constructor() {
    this._requestObject = {
      baseUrl: '',
      resourcePath: '',
      queryParams: '',
      headers: '',
      payload: '',
    };
  }

  baseUrl(baseUrl: string): this {
    this._requestObject.baseUrl = baseUrl;
    return this;
  }

  resourcePath(resourcePath: string): this {
    this._requestObject.resourcePath = resourcePath;
    return this;
  }

  queryParams(queryParams: any): this {
    this._requestObject.queryParams = queryParams;
    return this;
  }
  headers(headers: any): this {
    this._requestObject.headers = headers;
    return this;
  }
  payload(payload: any): this {
    this._requestObject.payload = payload;
    return this;
  }

  build(): RequestObject {
    return this._requestObject;
  }
}
