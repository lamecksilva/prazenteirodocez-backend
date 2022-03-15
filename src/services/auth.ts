/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';

export interface DecodedUsuario extends Omit<Usuario, '_id'> {
	id: string;
}

// Classes são tanto tipos, quanto valor
// Static não precisa instanciar
export async function hashPassword(senha: string, salt = 10): Promise<string> {
	return await bcrypt.hash(senha, salt);
}

export async function comparePasswords(
	senha: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(senha, hashedPassword);
}

export function generateToken(
	payload: any,
	expiresIn?: string | number
): string {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'secretKey', {
		expiresIn: expiresIn || '1d',
	});
}

export function decodeToken(token: string): DecodedUsuario {
	// Forçando resposta de função para o TS
	return jwt.verify(
		token,
		process.env.JWT_SECRET_KEY || 'secretKey'
	) as DecodedUsuario;
}
