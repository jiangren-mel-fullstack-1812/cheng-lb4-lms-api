import {ChengLb4TodoApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ChengLb4TodoApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ChengLb4TodoApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
