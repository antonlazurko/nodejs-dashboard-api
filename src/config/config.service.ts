import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { IConfigService } from './config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';

@injectable()
export class ConfigService implements IConfigService {
	private config: { [key: string]: string | undefined };

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.config = process.env;
		if (!this.config || Object.keys(this.config).length === 0) {
			this.logger.error('[ConfigService] No environment variables found.');
		} else {
			this.logger.log('[ConfigService] Environment variables loaded');
		}
	}

	get(key: string): string {
		const value = this.config[key];
		if (!value) {
			this.logger.error(
				`[ConfigService] Key "${key}" is not defined in the environment variables.`,
			);
			throw new Error(`Key "${key}" is not defined.`);
		}
		return value;
	}
}
