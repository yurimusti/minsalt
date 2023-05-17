/* eslint-disable no-empty-pattern */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectID } from 'mongodb';

export const loginComerciante = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    let { email, password } = input;

    email = email.toLowerCase();

    if (email === null || password === null) {
        return {
            status: {
                status: 401,
                message: 'Usuário sem permissão'
            }
        };
    }

    try {
        const user = await dbConnect.collection('comerciante').findOne({ email });

        if (user === null || user === undefined) {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'Email ou senha incorretos, tente novamente.'
                }
            };
        }
        const match = await bcrypt.compare(password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.SECRET);

        if (match && user.status === true) {
            return {
                data: { ...user },
                status: {
                    status: 200,
                    message: 'Comerciante logado com sucesso',
                    accessToken: accessToken
                }
            };
        } else {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'Comerciante sem permissão',
                    accessToken: null
                }
            };
        }
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: {
                status: 401,
                message: 'Comerciante sem permissão',
                accessToken: null
            }
        };
    }
};

export const getInfoComerciante = async (parent, { input }) => {
    const { accessToken } = input;

    if (accessToken === undefined || accessToken === null) {
        return {
            data: null,
            status: {
                status: 401,
                message: 'Comerciante não encontrado.'
            }
        };
    } else {
        return {
            data: jwt.decode(accessToken),
            status: {
                status: 200,
                message: '',
                accessToken
            }
        };
    }
};

export const createComerciante = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const exist = await dbConnect.collection('comerciante').findOne({ email: input.email });

    if (exist === null) {
        return dbConnect
            .collection('comerciante')
            .insertOne({
                nomeComerciante: input.nomeComerciante,
                email: input.email,
                password: hashedPassword,
                cpf: input.cpf,
                status: true,
                produtosVendidos: [],
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(() => {
                return {
                    data: null,
                    status: {
                        status: 200,
                        message: 'Comerciantte criado com sucesso.'
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
    } else {
        return {
            data: null,
            status: {
                status: 403,
                message: 'Email já cadastrado. Por favor verifique o campo email'
            }
        };
    }
};

export const updateComerciante = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    try {
        const comerciante = await dbConnect
            .collection('comerciante')
            .findOne({ _id: ObjectID(input._id) });

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

        await dbConnect.collection('comerciante').update(
            { _id: ObjectID(input._id) },
            {
                ...comerciante,
                nomeComerciante:
                    input.nomeComerciante === null || input.nomeComerciante === undefined
                        ? comerciante.nomeComerciante
                        : input.nomeComerciante,
                email:
                    input.email === null || input.email === undefined
                        ? comerciante.email
                        : input.email,
                cpf: input.cpf === null || input.cpf === undefined ? comerciante.cpf : input.cpf,
                updatedAt: new Date()
            }
        );
        const data = await dbConnect.collection('comerciante').findOne({ _id: ObjectID(auth) });

        return {
            data,
            status: {
                status: 200,
                message: 'Comerciante alterado com sucesso'
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

export const deleteComerciante = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    try {
        const comerciante = await dbConnect
            .collection('comerciante')
            .findOne({ _id: ObjectID(input.comercianteId) });

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

        await dbConnect
            .collection('comerciante')
            .update({ _id: ObjectID(input.comercianteId) }, { ...comerciante, status: false });

        const data = await dbConnect
            .collection('comerciante')
            .findOne({ _id: ObjectID(input.comercianteId) });

        return {
            data,
            status: {
                status: 200,
                message: 'Comerciante desativado com sucesso',
                accessToken: null
            }
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            status: {
                status: 401,
                message: 'Comerciante sem permissão',
                accessToken: null
            }
        };
    }
};
