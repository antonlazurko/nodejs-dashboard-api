import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigService } from './config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Failed to read the file .env or it is missing.');
		} else {
			this.logger.log('[ConfigService] .env configuration loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key] as string;
	}
}
