/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response } from 'express';

// Abstract classes can only be extended
export abstract class BaseController {
	protected sendErrorResponse(res: Response, apiError: any): Response {
		return res.status(apiError?.code || 400).json({
			code: apiError?.code || 400,
			message: apiError?.message,
		});
	}

	protected sendCreatedResponse(res: Response, data: any): Response {
		return res.status(201).json({ code: 201, message: 'Criado', data });
	}

	protected sendSuccessResponse(res: Response, data: any): Response {
		return res.status(200).json({ code: 200, message: 'Sucesso', data });
	}
}
