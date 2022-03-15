import { Usuario } from '../../models/Usuario';

export async function CadastrarUsuario(data: Partial<Usuario>): Promise<any> {
	const existsUsuario = await Usuario.findOne({ email: data.email });

	if (existsUsuario) {
		throw new Error('Email já cadastrado');
	}

	const usuario = new Usuario(data);

	const novoUsuario: any = await usuario.save();

	const usuarioCadastrado = await Usuario.findOne(
		{ _id: novoUsuario.id },
		{ senha: 0, documento: 0 }
	);

	return usuarioCadastrado;
}
