import { Usuario } from '../../models/Usuario';
import { comparePasswords, generateToken } from '../../services/auth';

export async function FazerLoginUsuario(data: {
	email: string;
	senha: string;
}): Promise<any> {
	const usuario = await Usuario.findOne({ email: data.email });

	if (!usuario || !usuario?.senha) {
		throw new Error('Usuário não encontrado');
	}

	if (!(await comparePasswords(data.senha, usuario.senha))) {
		throw new Error('Senha incorreta');
	}

	const token = generateToken({
		id: usuario.id,
		nome: usuario.nome,
		email: usuario.email,
	});

	return token;
}
