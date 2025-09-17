import { MidwayHttpError } from '@midwayjs/core';
import { IHttpError } from '../interface';

export class CustomHttpError extends MidwayHttpError {
    constructor(error: IHttpError) {
        const { message, code } = error;
        super(message, code);
    }
}