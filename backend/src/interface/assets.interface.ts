
export interface IAssetsData {
    asset_id?: string;
    name?: string;
    type_is_crypto?: number;
    data_quote_start?: string;
    data_quote_end?: string;
    data_orderbook_start?: string;
    data_orderbook_end?: string;
    data_trade_start?: string;
    data_trade_end?: string;
    data_symbols_count?: number;
    volume_1hrs_usd?: number;
    volume_1day_usd?: number;
    volume_1mth_usd?: number;
    price_usd?: number;
    id_icon?: string;
    supply_current?: number;
    supply_total?: number;
    supply_max?: number;
    chain_addresses?: IChainAddresses[];
    data_start?: string;
    data_end?: string
}

interface IChainAddresses {
    chain_id: string;
    network_id: string;
    address: string
}

export interface IParams {
    // Comma or semicolon delimited asset identifiers used to filter response. (optional, eg. BTC;ETH).
    filter_asset_id?: string;
}

// 加密货币代号与名称的映射表
export const CRYPTO_ASSETS: Record<string, string> = {
    BTC: 'Bitcoin',
    ETH: 'Ether',
    LTC: 'Litecoin',
    XMR: 'Monero',
    XRP: 'Ripple',
    DOGE: 'Dogecoin',
    DASH: 'Dash',
};