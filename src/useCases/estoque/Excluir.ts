import { ItemEstoque } from '../../models/ItemEstoque';

export async function ExcluirItemEstoque(id: string): Promise<any> {
	const itemEstoque = await ItemEstoque.findOneAndDelete({ _id: id });

	return itemEstoque;
}
