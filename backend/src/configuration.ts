import { join } from 'path';
import * as egg from '@midwayjs/web';
import { App, Configuration, ILifeCycle } from '@midwayjs/core';

import { NotFoundFilter } from './filter/notfound.filter';
import { DefaultErrorFilter } from './filter/default.filter';

import { FormatMiddleware } from './middleware/format.middleware';

@Configuration({
  imports: [egg],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('egg')
  app: egg.Application;

  async onReady() {
    this.app.useMiddleware([FormatMiddleware]);
    this.app.useFilter([DefaultErrorFilter, NotFoundFilter]);
  }
}
