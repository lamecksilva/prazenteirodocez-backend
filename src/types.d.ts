import * as http from 'http';
import { DecodedUsuario } from './services/auth';

// module augmentation
declare module 'express-serve-static-core' {
	export interface Request extends http.IncomingMessage, Express.Request {
		decoded?: DecodedUsuario;
		// queryParams?: PaginationQuery;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'staging' | 'production';
			PORT: 'string';
			JWT_SECRET_KEY: 'string';
			MONGODB_DEBUG: 'string';
			MONGODB_URI: 'string';
		}
	}
}
