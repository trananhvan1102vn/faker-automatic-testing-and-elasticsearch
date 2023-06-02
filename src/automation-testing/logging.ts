import { Response } from 'supertest';
import { Logger } from '@nestjs/common';
const logger = new Logger();
let isLoggingEnabled = true;
export class TestLogs {
  static enableLogs(logSwitch: boolean) {
    isLoggingEnabled = logSwitch;
  }
  static getLogSwitch() {
    return isLoggingEnabled;
  }
  static writeLogs(response: Response) {
    if (isLoggingEnabled) {
      const reqData = JSON.parse(JSON.stringify(response)).req;
      logger.log('Request-method : ' + JSON.stringify(reqData.method));
      logger.log('Request-url: ' + JSON.stringify(reqData.url));
      logger.log('Request-data: ' + JSON.stringify(reqData.data));
      logger.log('Request-headers: ' + JSON.stringify(reqData.headers));
      logger.log('Reponse-status: ' + JSON.stringify(response.status));
      logger.log('Reponse-headers: ' + JSON.stringify(response.headers));
      logger.log('Reponse-body: ' + JSON.stringify(response.body));
    }
  }
}
