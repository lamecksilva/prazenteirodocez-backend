import { decodeToken } from "../services/auth";
import { NextFunction, Request, Response } from 'express';


export function authMiddleware(
	// "Partial": Deixa opcionais todas propriedades de um tipo
	req: Partial<Request>,
	res: Partial<Response>,
	next: NextFunction
): Response | void {
	const token = req.headers?.['x-access-token'];

	try {
		if (!token) {
			return res
				.status?.(401)
				.send({ code: 401, error: 'Token não fornecido' });
		}

		const decoded = decodeToken(token as string);
		// "src/types.d.ts" Sobrescreve tipo Request do Express (Module augmentation)
		req.decoded = decoded;
		next();
	} catch (err: any) {
		res.status?.(401).send({ code: 401, error: err?.message });
	}
}
