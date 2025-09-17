import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    keys: appInfo.name + '_1757998098542_8506',
    egg: {
      port: 7001,
      globalPrefix: '/v1/api'
    },
    security: {
      csrf: false,
    },
  } as MidwayConfig;
};