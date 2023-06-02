export class HeaderUtil {
  headers: any;
  constructor() {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  getHeaders(): any {
    return this.headers;
  }
  addHeader(header): HeaderUtil {
    this.headers = Object.assign(this.headers, header);
    return this;
  }
  removeHeader(key: string): HeaderUtil {
    delete this.headers[key];
    return this;
  }
  clearHeaders(): HeaderUtil {
    Object.keys(this.headers).forEach((key) => delete this.headers[key]);
    return this;
  }
}
