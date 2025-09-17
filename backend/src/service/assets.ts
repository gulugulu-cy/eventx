import { Provide } from '@midwayjs/core';
import { generateMockCryptoData } from '../mock/assets.mock';

import { CRYPTO_ASSETS, IAssetsData, IParams } from '../interface/assets.interface';

@Provide()
export class AssetsService {
  async getListAllAssets(params: IParams): Promise<IAssetsData[]> {
    let assetsToFetch: string[];
    const { filter_asset_id } = params

    // 1. 如果传入了 filter_asset_id，解析成数组
    if (filter_asset_id) {
      assetsToFetch = filter_asset_id
        .split(/[,;]/)
        .map((asset) => asset.trim().toUpperCase())
        .filter((asset) => CRYPTO_ASSETS[asset]); // 只保留有效的代号
    } else {
      // 2. 如果未传入 filter_asset_id，使用默认的 7 种加密货币
      assetsToFetch = Object.keys(CRYPTO_ASSETS);
    }

    // 如果assetsToFetch为空，直接返回空数组
    if (!assetsToFetch.length) return [];

    // 3. 生成对应的加密货币数据
    const data: IAssetsData[] = assetsToFetch.map((asset) => generateMockCryptoData(asset));

    return data
  }
}
