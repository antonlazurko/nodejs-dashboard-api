import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata'

import { IExceptionFilter } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class ExceptionFilter implements IExceptionFilter {

    constructor (@inject(TYPES.ILogger) private logger: ILogger) {
        this.logger = logger
        this.logger.log('Exception Filter created')
    }

    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpError) {
            this.logger.error(`[${err.context}] Error>> ${err.statusCode} : ${err.message}`)
            res.status(err.statusCode).send({ err: err.message })
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({ err: err.message })
        }
    }
}