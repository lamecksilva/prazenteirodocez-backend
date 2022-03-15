import mongoose, { Document, Model, Schema } from 'mongoose';
import { hashPassword } from '../services/auth';

export interface Usuario {
	_id?: string;
	id: string;
	nome: string;
	email: string;
	senha?: string;
	avatar?: string;
}

export enum CUSTOM_VALIDATION {
	DUPLICATED = 'DUPLICATED',
}

const schema = new Schema(
	{
		nome: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		senha: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, ret): void => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

schema.path('email').validate(
	async (email: string) => {
		const emailCount = await mongoose.models.Usuario.countDocuments({ email });
		return !emailCount;
	},
	'already exists in the database.',
	CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<UsuarioModel>('save', async function (): Promise<void> {
	if (!this.senha || !this.isModified('senha')) {
		return;
	}

	try {
		const hashedPassword = await hashPassword(this.senha);
		this.senha = hashedPassword;
	} catch (error) {
		console.error(`Erro ao fazer o hash da senha do usuario ${this.nome}`);
	}
});

interface UsuarioModel extends Omit<Usuario, '_id' | 'id'>, Document {}

export const Usuario: Model<UsuarioModel> = mongoose.model('Usuario', schema);
