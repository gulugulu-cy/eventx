import { Context } from '@midwayjs/web';
import { Inject, Controller, Get, Query } from '@midwayjs/core';

import { AssetsService } from '../service/assets';
import { IAssetsData, IParams } from '../interface/assets.interface';

@Controller('/assets')
export class AssetsController {
  @Inject()
  ctx: Context;

  @Inject()
  assetsService: AssetsService;

  @Get('/')
  async getListAllAssets(@Query() params: IParams): Promise<IAssetsData[]> {
    const data = await this.assetsService.getListAllAssets(params);
    return data;
  }
}
