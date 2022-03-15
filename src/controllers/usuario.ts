import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { CadastrarUsuario } from '../useCases/usuario/Cadastro';
import { FazerLoginUsuario } from '../useCases/usuario/FazerLogin';

@Controller('api/usuario')
export class UsuariosController extends BaseController {
	@Post('')
	public async cadastrar(req: Request, res: Response): Promise<Response> {
		try {
			const newUsuario = await CadastrarUsuario(req.body);

			return this.sendCreatedResponse(res, newUsuario);
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}

	@Post('login')
	public async login(req: Request, res: Response): Promise<Response> {
		try {
			const token = await FazerLoginUsuario({
				email: req.body.email,
				senha: req.body.senha,
			});

			return this.sendSuccessResponse(res, { token });
		} catch (error: any) {
			return this.sendErrorResponse(res, error);
		}
	}
}
