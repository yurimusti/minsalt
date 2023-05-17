import { ObjectID } from 'mongodb';

export const lancarProdutoDistribuidora = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;
    const { idComerciante, idProduto, quantidade } = input;

    const comerciante = await dbConnect
        .collection('comerciante')
        .findOne({ _id: ObjectID(idComerciante) });

    if (comerciante === null) {
        return {
            data: null,
            status: {
                status: 401,
                message: 'Comerciante sem permissão',
                accessToken: null
            }
        };
    }

    const item = await dbConnect.collection('products').findOne({ _id: ObjectID(idProduto) });

    await dbConnect.collection('comerciante').update(
        { _id: ObjectID(idComerciante) },
        {
            ...comerciante,
            produtosVendidos: [
                ...comerciante.produtosVendidos,
                {
                    _id: item._id,
                    nome: item.nome,
                    preco: item.preco,
                    quantidade,
                    createdAt: new Date()
                }
            ],
            updatedAt: new Date()
        }
    );
    const data = await dbConnect
        .collection('comerciante')
        .findOne({ _id: ObjectID(input.idComerciante) });

    return {
        data,
        status: {
            status: 200,
            message: 'Comerciante alterado com sucesso'
        }
    };
};
