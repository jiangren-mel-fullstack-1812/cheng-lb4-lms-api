import { ChengLb4TodoApiApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import * as fs from 'fs';

export { ChengLb4TodoApiApplication };

export async function main() {
  const options = {
    rest: {
      protocol: 'https',
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    },
  };
  const app = new ChengLb4TodoApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
