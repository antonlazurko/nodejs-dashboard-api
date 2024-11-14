import { Container } from "inversify";
import 'reflect-metadata'

import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";

const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();
export { app, appContainer }