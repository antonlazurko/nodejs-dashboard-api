import { Container, ContainerModule, interfaces } from "inversify";
import 'reflect-metadata'

import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { IUserController } from "./users/user.controller.interface";
import { TYPES } from "./types";

export const appBindings =  new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IUserController>(TYPES.IUserController).to(UserController);
    bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
    bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { app, appContainer }
}

export const { app, appContainer } = bootstrap()