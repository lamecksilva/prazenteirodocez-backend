import { Server } from '@overnightjs/core';
import { json } from 'body-parser';
import cors from 'cors';
import { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { EstoqueController } from './controllers/estoque';
import { UsuariosController } from './controllers/usuario';
import * as database from './database';

// import { deleteUnusedFiles } from './utils/fileUpload';

export class SetupServer extends Server {
	constructor(private port = 9000) {
		super();
	}

	public async init(): Promise<void> {
		this.setupExpress();
		this.setupControllers();
		await this.databaseSetup();
		this.setupErrorHandlers();
	}

	private setupExpress(): void {
		this.app.use(json());
		this.app.use(
			cors({
				origin: '*',
			})
		);

		process.env.NODE_ENV === 'development' && this.app.use(morgan('dev'));
	}

	private setupControllers(): void {
		const usuariosController = new UsuariosController();
		const estoqueController = new EstoqueController();

		this.addControllers([usuariosController, estoqueController]);

		this.app.get(
			'/',
			async (_: Partial<Request>, res: Response): Promise<void> => {
				res.send(`Igend running on port: ${this.port}`);
			}
		);
	}

	private async databaseSetup(): Promise<void> {
		await database.connect();
	}

	public async close(): Promise<void> {
		await database.close();
	}

	private setupErrorHandlers(): void {
		// this.app.use(handleNotFoundRoute);
		this.app.use(
			(error: any, _: Partial<Request>, res: Response, __: NextFunction) => {
				const errorCode = error.status || 500;

				res.status(errorCode).json({ code: errorCode, message: error.message });
			}
		);
	}

	public getApp(): Application {
		return this.app;
	}

	public start(): void {
		this.app.listen(this.port, () => {
			console.info(`Servidor rodando na porta: ${this.port}`);
		});
	}
}
