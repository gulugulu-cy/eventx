import { Context } from '@midwayjs/web';
import { Catch, ILogger, Inject, MidwayHttpError } from '@midwayjs/core';

@Catch()
export class DefaultErrorFilter {
    @Inject()
    logger: ILogger;

    async catch(err: MidwayHttpError, ctx: Context) {
        ctx.status = err.status ?? 500;
        this.logger.error('ERROR======================>>>', err)

        return {
            code: err?.code ?? 500,
            message: err.message,
        }
    }

}