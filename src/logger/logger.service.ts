import { Logger, ISettingsParam, ILogObj } from 'tslog'
import { injectable } from 'inversify';
import { ILogger } from "./logger.interface";
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        } as ISettingsParam<ILogObj>)
    }

    log(...args: unknown[]) {
        this.logger.info(...args)
    }
    error(...args: unknown[]) {
        //send sentry / rollbar
        this.logger.error(...args)
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}