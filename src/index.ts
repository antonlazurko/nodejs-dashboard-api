import 'reflect-metadata';
import { boot } from './main';

export default async (req: any, res: any): Promise<void> => {
	const { app: vercelApp } = await boot;
	vercelApp.app(req, res);
};
