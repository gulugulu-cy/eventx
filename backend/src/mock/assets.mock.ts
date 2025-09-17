import { faker } from '@faker-js/faker';
import { CRYPTO_ASSETS, IAssetsData } from '../interface/assets.interface';

// 生成随机加密货币数据
export const generateMockCryptoData = (assetId: string): IAssetsData => {
    const assetName = CRYPTO_ASSETS[assetId] || assetId; 

    return {
        asset_id: assetId,
        name: assetName,
        type_is_crypto: 1,
        data_quote_start: faker.date.past().toISOString(),
        data_quote_end: faker.date.recent().toISOString(),
        data_orderbook_start: faker.date.past().toISOString(),
        data_orderbook_end: faker.date.recent().toISOString(),
        data_trade_start: faker.date.past().toISOString(),
        data_trade_end: faker.date.recent().toISOString(),
        data_symbols_count: faker.number.int({ min: 10, max: 100 }),
        volume_1hrs_usd: faker.number.float({ min: 1000, max: 1000000 }),
        volume_1day_usd: faker.number.float({ min: 10000, max: 10000000 }),
        volume_1mth_usd: faker.number.float({ min: 100000, max: 100000000 }),
        price_usd: faker.number.float({ min: 0.01, max: 100000 }),
        id_icon: '',
        supply_current: faker.number.float({ min: 1000, max: 1000000000 }),
        supply_total: faker.number.float({ min: 1000, max: 1000000000 }),
        supply_max: faker.number.float({ min: 1000, max: 1000000000 }),
        chain_addresses: [
            {
                chain_id: faker.string.uuid(),
                network_id: faker.string.uuid(),
                address: faker.finance.ethereumAddress(),
            },
        ],
        data_start: faker.date.past().toISOString(),
        data_end: faker.date.recent().toISOString(),
    };
};