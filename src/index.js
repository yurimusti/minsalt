require('dotenv').config();

import { createServer } from 'http';
import express from 'express';
import Mongodb from 'mongodb';
import cors from 'cors';

import { WebSocketServer } from 'ws';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import Query from './schema/query.graphql';
import Mutation from './schema/mutation.graphql';
import Type from './schema/type.graphql';
import Input from './schema/input.graphql';
import Subscription from './schema/subscription.graphql';

import * as ComercianteteResolver from './controller/comerciante';
import * as LancamentosResolver from './controller/lancamentos';
import * as ProdutosResolver from './controller/produtos';

const MongoClient = Mongodb.MongoClient;

const typeDefs = gql`
    ${Query}
    ${Mutation}
    ${Type}
    ${Input}
    ${Subscription}
`;

// Provide resolver functions for your schema fields
try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URL}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect((err, client) => {
        console.log(
            `Conectado no banco de dados. ${process.env.ENV === 'production' ? '(PROD)' : '(DEV)'}`
        );
        const db = client.db(
            process.env.ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV
        );

        const app = express();
        const httpServer = createServer(app);

        const resolvers = {
            Query: {
                // Comerciante
                loginComerciante: ComercianteteResolver.loginComerciante,
                getInfoComerciante: ComercianteteResolver.getInfoComerciante,
                // Produtos
                getAllProdutos: ProdutosResolver.getAllProdutos
            },
            Mutation: {
                //Comerciante
                createComerciante: ComercianteteResolver.createComerciante,
                updateComerciante: ComercianteteResolver.updateComerciante,
                deleteComerciante: ComercianteteResolver.deleteComerciante,
                //Produto
                createProduct: ProdutosResolver.createProduct,
                updateProduct: ProdutosResolver.updateProduct,
                deleteProduct: ProdutosResolver.deleteProduct,
                //Lancamentos
                adicionarProdutoEmComerciante: LancamentosResolver.lancarProdutoDistribuidora,
            }
            // Subscription: {
            //     // PubSub com Subscription GraphQL
            //     // numberIncremented: {
            //     //     subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED'])
            //     // }
            // }
        };

        const schema = makeExecutableSchema({ typeDefs, resolvers });

        const wsServer = new WebSocketServer({
            server: httpServer,
            path: '/graphql'
        });
        const serverCleanup = useServer({ schema }, wsServer);

        const server = new ApolloServer({
            schema,
            context: ({ req }) => ({
                auth: req.headers.authorization,
                dbConnect: db
            }),
            playground: true,
            introspection: true,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            }
                        };
                    }
                }
            ]
        });
        server.start();
        server.applyMiddleware({ app });

        app.use(cors({ origin: '*' }));
        app.use('/', (req, res) => res.send({ server: 'api-admin-comerciante', status: 'ok' }));

        httpServer.listen(process.env.PORT || 4000, () => {
            console.log(
                `🚀 Query endpoint ready at http://localhost:${process.env.PORT || 4000}${
                    server.graphqlPath
                }`
            );
            console.log(
                `🚀 Subscription endpoint ready at ws://localhost:${process.env.PORT || 4000}${
                    server.graphqlPath
                }`
            );
        });
        // Teste PubSub

        // let currentNumber = 0;
        // const incrementNumber = () => {
        //     currentNumber++;
        //     pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
        //     setTimeout(incrementNumber, 1000);
        // };

        // // Start incrementing
        // incrementNumber();
    });

    client.close();
} catch (error) {
    console.log(error);
}
