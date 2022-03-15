import { ItemEstoque } from '../../models/ItemEstoque';

export async function CriarItemEstoque(
	data: Partial<ItemEstoque>
): Promise<any> {
	const itemEstoque = new ItemEstoque(data);
	const novoItem: any = await itemEstoque.save();

	const itemCadastrado = await ItemEstoque.findOne({ _id: novoItem.id });

	return itemCadastrado;
}
