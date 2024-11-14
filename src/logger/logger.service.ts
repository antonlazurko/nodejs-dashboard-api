import { Logger, ISettingsParam, ILogObj } from 'tslog'
import { ILogger } from "./logger.interface";

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