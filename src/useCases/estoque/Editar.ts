import { ItemEstoque } from '../../models/ItemEstoque';

export async function EditarItemEstoque(
	id: string,
	data: Partial<ItemEstoque>
): Promise<any> {
	const itemEstoque = await ItemEstoque.findOne({ _id: id });
	if (!itemEstoque) {
		throw new Error('Item não encontrado');
	}

	const itemEstoqueAtualizado = await ItemEstoque.findOneAndUpdate(
		{ _id: id },
		{ $set: data },
		{ new: true }
	);

	return itemEstoqueAtualizado;
}
