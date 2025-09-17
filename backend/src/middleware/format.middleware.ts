import { Context, NextFunction } from '@midwayjs/web';
import { Middleware, IMiddleware } from '@midwayjs/core';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            const result = await next();

            return {
                code: 200,
                message: 'OK',
                data: result,
            }
        };
    }
}