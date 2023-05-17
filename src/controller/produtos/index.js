import { ObjectID } from 'mongodb';

export const getAllProdutos = async (_, __, context) => {
    const dbConnect = context.dbConnect;

    try {
        const dataAllProdutos = await dbConnect
            .collection('products')
            .find({})
            .sort({ rank: -1 })
            .toArray();

        return {
            data: dataAllProdutos,
            status: {
                status: 200,
                message: ''
            }
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: {
                status: 500,
                message: 'Algo de errado aconteceu.'
            }
        };
    }
};

export const createProduct = async (_, { input }, context) => {
    const dbConnect = context.dbConnect;
    return dbConnect
        .collection('products')
        .insertOne({
            nome: input.nome,
            preco: input.preco,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(() => {
            return {
                data: null,
                status: {
                    status: 200,
                    message: 'Item criado com sucesso.'
                }
            };
        })
        .catch(() => {
            return {
                data: null,
                status: {
                    status: 403,
                    message: 'Algo de errado aconteceu'
                }
            };
        });
};

export const updateProduct = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;

    try {
        const product = await dbConnect
            .collection('products')
            .findOne({ _id: ObjectID(input._id) });

        if (product === null) {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'Comerciante sem permissão',
                    accessToken: null
                }
            };
        }

        await dbConnect.collection('products').update(
            { _id: ObjectID(input._id) },
            {
                ...product,
                nome: input.nome,
                preco: input.preco,
                status: input.status,
                updatedAt: new Date()
            }
        );
        const data = await dbConnect.collection('products').findOne({ _id: ObjectID(input._id) });

        return {
            data,
            status: {
                status: 200,
                message: 'Item alterado com sucesso'
            }
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: {
                status: 500,
                message: 'Algo de errado aconteceu.'
            }
        };
    }
};

export const deleteProduct = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;

    try {
        const product = await dbConnect
            .collection('products')
            .findOne({ _id: ObjectID(input.idProduct) });

        if (product === null) {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'Sem permissão',
                    accessToken: null
                }
            };
        }

        await dbConnect.collection('products').update(
            { _id: ObjectID(input.idProduct) },
            {
                ...product,
                status: false,
                updatedAt: new Date()
            }
        );
        const data = await dbConnect.collection('products').findOne({ _id: ObjectID(input.idProduct) });

        return {
            data,
            status: {
                status: 200,
                message: 'Item alterado com sucesso'
            }
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: {
                status: 500,
                message: 'Algo de errado aconteceu.'
            }
        };
    }
};
