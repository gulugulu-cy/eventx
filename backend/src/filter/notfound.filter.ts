import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
    async catch(err: MidwayHttpError, ctx: Context) {
        ctx.status = 404;
        return {
            code: 404,
            message: err.message
        };
    }
}