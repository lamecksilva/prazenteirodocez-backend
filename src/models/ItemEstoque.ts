import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ItemEstoque {
	_id?: string;
	id: string;
	nome: string;
	quantidade: number;
	minimo: number;
	cor: string;
}

const schema = new Schema(
	{
		nome: {
			type: String,
			required: true,
		},
		quantidade: {
			type: Number,
			required: true,
			default: 0,
		},
		minimo: {
			type: Number,
			required: true,
			default: 0,
		},
		cor: {
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

interface ItemEstoqueModel extends Omit<ItemEstoque, '_id' | 'id'>, Document {}

export const ItemEstoque: Model<ItemEstoqueModel> = mongoose.model(
	'ItemEstoque',
	schema
);
