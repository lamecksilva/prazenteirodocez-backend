import {
	Controller,
	Delete,
	Get,
	Middleware,
	Post,
	Put,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { authMiddleware } from '../middlewares/auth';
import { CriarItemEstoque } from '../useCases/estoque/Criar';
import { EditarItemEstoque } from '../useCases/estoque/Editar';
import { ExcluirItemEstoque } from '../useCases/estoque/Excluir';
import { ListarItensEstoque } from '../useCases/estoque/ListarTodos';

@Controller('api/estoque')
export class EstoqueController extends BaseController {
	@Get('')
	@Middleware(authMiddleware)
	public async listarTodos(req: Request, res: Response): Promise<Response> {
		try {
			const itensEstoque = await ListarItensEstoque();

			return this.sendSuccessResponse(res, itensEstoque);
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}

	@Post('')
	@Middleware(authMiddleware)
	public async cadastrar(req: Request, res: Response): Promise<Response> {
		try {
			const novoItemEstoque = await CriarItemEstoque(req.body);

			return this.sendCreatedResponse(res, novoItemEstoque);
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}

	@Put(':id')
	@Middleware(authMiddleware)
	public async editar(req: Request, res: Response): Promise<Response> {
		try {
			const itemEstoqueEditado = await EditarItemEstoque(
				req.params.id,
				req.body
			);

			return this.sendSuccessResponse(res, itemEstoqueEditado);
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}

	@Delete(':id')
	@Middleware(authMiddleware)
	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const itemEstoqueEditado = await ExcluirItemEstoque(req.params.id);

			return this.sendSuccessResponse(res, itemEstoqueEditado);
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}
}
