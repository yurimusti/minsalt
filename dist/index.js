module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(16);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(3);

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _mongodb = __webpack_require__(0);

var _mongodb2 = _interopRequireDefault(_mongodb);

var _cors = __webpack_require__(5);

var _cors2 = _interopRequireDefault(_cors);

var _ws = __webpack_require__(6);

var _apolloServerExpress = __webpack_require__(7);

var _ws2 = __webpack_require__(8);

var _apolloServerCore = __webpack_require__(9);

var _comerciante = __webpack_require__(10);

var ComercianteteResolver = _interopRequireWildcard(_comerciante);

var _lancamentos = __webpack_require__(13);

var LancamentosResolver = _interopRequireWildcard(_lancamentos);

var _produtos = __webpack_require__(14);

var ProdutosResolver = _interopRequireWildcard(_produtos);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(15).config();

var Query = 'type Query {\n    # Comerciante\n    loginComerciante(input: LoginComercianteInput): ComercianteResponse\n    getInfoComerciante(input: GetInfoComercianteInput): ComercianteResponse\n    # Produtos\n    getAllProdutos: ProdutosResponse\n}\n';
var Mutation = 'type Mutation {\n    # Comerciante\n    createComerciante(input: CreateComercianteInput): ComercianteResponse\n    updateComerciante(input: UpdateComercianteInput): ComercianteResponse\n    deleteComerciante(input: DeleteComercianteInput): ComercianteResponse\n    # Produto\n    createProduct(input: CreateProductInput): CreateProductResponse\n    updateProduct(input: UpdateProductInput): UpdateProductResponse\n    deleteProduct(input: DeleteProductInput): DeleteProductResponse\n    # Lan\xE7amento\n    lancarProdutoDistribuidora(\n        input: LancarProdutoDistribuidora\n    ): LancarProdutoDistribuidoraResponse\n}\n';
var Type = 'type Comerciante {\n    _id: String\n    email: String\n    nomeComerciante: String\n    produtosVendidos: [ProdutosVendidos]\n    createdAt: String\n    updatedAt: String\n}\n\ntype ProdutosVendidos {\n    _id: String!\n    nome: String\n    preco: Float\n}\n\ntype Status {\n    status: Int!\n    message: String\n    accessToken: String\n}\n\ntype Produtos {\n    _id: String\n    nome: String\n    preco: Float\n    status: Boolean\n}\n\ntype ComercianteResponse {\n    data: Comerciante\n    status: Status\n}\n\ntype ProdutosResponse {\n    data: [Produtos]\n    status: Status\n}\n\ntype CreateProductResponse {\n    data: [Produtos]\n    status: Status\n}\n\ntype UpdateProductResponse {\n    data: [Produtos]\n    status: Status\n}\n\ntype DeleteProductResponse {\n    data: [Produtos]\n    status: Status\n}\n\ntype LancarProdutoDistribuidoraResponse {\n    data: Comerciante\n    status: Status\n}\n';
var Input = 'input CreateComercianteInput {\n    nomeComerciante: String\n    email: String\n    password: String\n    cpf: String\n    produtosVendidos: [ProdutosVendidosInput]\n}\n\ninput ProdutosVendidosInput {\n    produtoId: String\n    quantidade: String\n    createdAt: String\n    updatedAt: String\n}\n\ninput LoginComercianteInput {\n    email: String!\n    password: String!\n}\n\ninput UpdateComercianteInput {\n    _id: String!\n    nomeComerciante: String\n    email: String\n    cpf: String\n}\n\ninput DeleteComercianteInput {\n    comercianteId: String!\n}\n\ninput GetInfoComercianteInput {\n    accessToken: String!\n}\n\ninput CreateProductInput {\n    nome: String!\n    preco: Float!\n}\n\ninput UpdateProductInput {\n    _id: String!\n    nome: String!\n    preco: Float!\n    status: Boolean!\n}\n\ninput DeleteProductInput {\n    idProduct: String\n}\n\ninput LancarProdutoDistribuidora {\n    idComerciante: String!\n    idProduto: String!\n    quantidade: Int!\n}\n';
var Subscription = '# type Subscription {\n    \n# }\n';


const MongoClient = _mongodb2.default.MongoClient;

const typeDefs = _apolloServerExpress.gql`
    ${Query}
    ${Mutation}
    ${Type}
    ${Input}
    ${Subscription}
`;

// Provide resolver functions for your schema fields
try {
    const uri = `mongodb+srv://${"yurimusti"}:${"4NKtOPiYFI3wXgOo"}${"@cluster0.7ktnrwz.mongodb.net/"}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect((err, client) => {
        console.log(`Conectado no banco de dados. ${ true ? '(PROD)' : '(DEV)'}`);
        const db = client.db( true ? "minsair" : process.env.DB_NAME_DEV);

        const app = (0, _express2.default)();
        const httpServer = (0, _http.createServer)(app);

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
                lancarProdutoDistribuidora: LancamentosResolver.lancarProdutoDistribuidora
                // Subscription: {
                //     // PubSub com Subscription GraphQL
                //     // numberIncremented: {
                //     //     subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED'])
                //     // }
                // }
            } };

        const schema = (0, _apolloServerExpress.makeExecutableSchema)({ typeDefs, resolvers });

        const wsServer = new _ws.WebSocketServer({
            server: httpServer,
            path: '/graphql'
        });
        const serverCleanup = (0, _ws2.useServer)({ schema }, wsServer);

        const server = new _apolloServerExpress.ApolloServer({
            schema,
            context: ({ req }) => ({
                auth: req.headers.authorization,
                dbConnect: db
            }),
            playground: true,
            introspection: true,
            plugins: [(0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({ httpServer }), {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    };
                }
            }]
        });
        server.start();
        server.applyMiddleware({ app });

        app.use((0, _cors2.default)({ origin: '*' }));
        app.use('/', (req, res) => res.send({ server: 'api-admin-comerciante', status: 'ok' }));

        httpServer.listen(process.env.PORT || 4000, () => {
            console.log(`🚀 Query endpoint ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
            console.log(`🚀 Subscription endpoint ready at ws://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("graphql-ws/lib/use/ws");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-core");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteComerciante = exports.updateComerciante = exports.createComerciante = exports.getInfoComerciante = exports.loginComerciante = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-empty-pattern */


var _jsonwebtoken = __webpack_require__(11);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = __webpack_require__(12);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongodb = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginComerciante = exports.loginComerciante = async (parent, { input }, context) => {
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
        const match = await _bcrypt2.default.compare(password, user.password);
        const accessToken = _jsonwebtoken2.default.sign(JSON.stringify(user), "4NKminsair2023tOPiYFI3wXgOo");

        if (match && user.status === true) {
            return {
                data: _extends({}, user),
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

const getInfoComerciante = exports.getInfoComerciante = async (parent, { input }) => {
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
            data: _jsonwebtoken2.default.decode(accessToken),
            status: {
                status: 200,
                message: '',
                accessToken
            }
        };
    }
};

const createComerciante = exports.createComerciante = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const hashedPassword = await _bcrypt2.default.hash(input.password, 10);

    const exist = await dbConnect.collection('comerciante').findOne({ email: input.email });

    if (exist === null) {
        return dbConnect.collection('comerciante').insertOne({
            nomeComerciante: input.nomeComerciante,
            email: input.email,
            password: hashedPassword,
            cpf: input.cpf,
            status: true,
            produtosVendidos: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(() => {
            return {
                data: null,
                status: {
                    status: 200,
                    message: 'Comerciantte criado com sucesso.'
                }
            };
        }).catch(() => {
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

const updateComerciante = exports.updateComerciante = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    try {
        const comerciante = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(input._id) });

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

        await dbConnect.collection('comerciante').update({ _id: (0, _mongodb.ObjectID)(input._id) }, _extends({}, comerciante, {
            nomeComerciante: input.nomeComerciante === null || input.nomeComerciante === undefined ? comerciante.nomeComerciante : input.nomeComerciante,
            email: input.email === null || input.email === undefined ? comerciante.email : input.email,
            cpf: input.cpf === null || input.cpf === undefined ? comerciante.cpf : input.cpf,
            updatedAt: new Date()
        }));
        const data = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(auth) });

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

const deleteComerciante = exports.deleteComerciante = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    try {
        const comerciante = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(input.comercianteId) });

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

        await dbConnect.collection('comerciante').update({ _id: (0, _mongodb.ObjectID)(input.comercianteId) }, _extends({}, comerciante, { status: false }));

        const data = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(input.comercianteId) });

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

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lancarProdutoDistribuidora = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongodb = __webpack_require__(0);

const lancarProdutoDistribuidora = exports.lancarProdutoDistribuidora = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;
    const { idComerciante, idProduto, quantidade } = input;

    const comerciante = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(idComerciante) });

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

    const item = await dbConnect.collection('products').findOne({ _id: (0, _mongodb.ObjectID)(idProduto) });

    await dbConnect.collection('comerciante').update({ _id: (0, _mongodb.ObjectID)(idComerciante) }, _extends({}, comerciante, {
        produtosVendidos: [...comerciante.produtosVendidos, {
            _id: item._id,
            nome: item.nome,
            preco: item.preco,
            quantidade,
            createdAt: new Date()
        }],
        updatedAt: new Date()
    }));
    const data = await dbConnect.collection('comerciante').findOne({ _id: (0, _mongodb.ObjectID)(input.idComerciante) });

    return {
        data,
        status: {
            status: 200,
            message: 'Comerciante alterado com sucesso'
        }
    };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProdutos = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongodb = __webpack_require__(0);

const getAllProdutos = exports.getAllProdutos = async (_, __, context) => {
    const dbConnect = context.dbConnect;

    try {
        const dataAllProdutos = await dbConnect.collection('products').find({}).sort({ rank: -1 }).toArray();

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

const createProduct = exports.createProduct = async (_, { input }, context) => {
    const dbConnect = context.dbConnect;
    return dbConnect.collection('products').insertOne({
        nome: input.nome,
        preco: input.preco,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(() => {
        return {
            data: null,
            status: {
                status: 200,
                message: 'Item criado com sucesso.'
            }
        };
    }).catch(() => {
        return {
            data: null,
            status: {
                status: 403,
                message: 'Algo de errado aconteceu'
            }
        };
    });
};

const updateProduct = exports.updateProduct = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;

    try {
        const product = await dbConnect.collection('products').findOne({ _id: (0, _mongodb.ObjectID)(input._id) });

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

        await dbConnect.collection('products').update({ _id: (0, _mongodb.ObjectID)(input._id) }, _extends({}, product, {
            nome: input.nome,
            preco: input.preco,
            status: input.status,
            updatedAt: new Date()
        }));
        const data = await dbConnect.collection('products').findOne({ _id: (0, _mongodb.ObjectID)(input._id) });

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

const deleteProduct = exports.deleteProduct = async (parent, { input }, context) => {
    const dbConnect = context.dbConnect;

    try {
        const product = await dbConnect.collection('products').findOne({ _id: (0, _mongodb.ObjectID)(input.idProduct) });

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

        await dbConnect.collection('products').update({ _id: (0, _mongodb.ObjectID)(input.idProduct) }, _extends({}, product, {
            status: false,
            updatedAt: new Date()
        }));
        const data = await dbConnect.collection('products').findOne({ _id: (0, _mongodb.ObjectID)(input.idProduct) });

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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "package.json";

/***/ })
/******/ ]);