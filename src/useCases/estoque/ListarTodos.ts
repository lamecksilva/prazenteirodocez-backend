import { ItemEstoque } from '../../models/ItemEstoque';

export async function ListarItensEstoque(): Promise<any> {
	const itensEstoque = await ItemEstoque.find({});

	return itensEstoque;
}
