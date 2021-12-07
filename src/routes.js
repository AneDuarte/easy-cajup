const express = require("express");
const routes = express.Router();

const InfoController = require("./app/controllers/InfoController");

const DadosPrimariosController = require("./app/controllers/DadosPrimariosController");

const EstadoCivilController = require("./app/controllers/EstadoCivilController");
const ClasseCausaController = require("./app/controllers/ClasseCausaController");
const TipoCausaController = require("./app/controllers/TipoCausaController");
const UFController = require("./app/controllers/UFController");
const GeneroController = require("./app/controllers/GeneroController");

const EnderecoController = require("./app/controllers/EnderecoController");
const TelefoneController = require("./app/controllers/TelefoneController");
const RegistroController = require("./app/controllers/RegistroController");

const UsuarioController = require("./app/controllers/UsuarioController");
const ConstituinteController = require("./app/controllers/ConstituinteController");

const TipoCausa_RegistroController = require("./app/controllers/TipoCausa_RegistroController")

const StatusController = require("./app/controllers/StatusController");
const GerarEnviarPDFController = require("./app/controllers/GerarEnviarPDFController");
const ResetarSenhaController = require("./app/controllers/ResetarSenhaController");

const SessionController = require("./app/controllers/SessionController");

const authMiddleware = require("./app/middlewares/auth");
const adminMiddleware = require("./app/middlewares/admin");

// Rota do Info
routes.get("/", InfoController.index);

// Rota de Dados Primários
routes.post("/primeiroacesso", DadosPrimariosController.store);
routes.get("/primeiroacesso", DadosPrimariosController.index_all);

// Rota do Session
routes.post("/session", SessionController.store);

// Rotas para Resetar Senha
routes.post("/reset", ResetarSenhaController.reset);
routes.patch("/reset/token/:token", ResetarSenhaController.novasenha);

// Rotas de Usuário
routes.post("/usuario", UsuarioController.store_extensionista);

routes.get("/estadocivil", EstadoCivilController.index);
routes.get("/classecausa", ClasseCausaController.index);
routes.get("/tipocausa", TipoCausaController.index);
routes.get("/uf", UFController.index);
routes.get("/genero", GeneroController.index);

routes.use(authMiddleware);

// Rotas de Usuário
routes.put("/usuario/:id", UsuarioController.update);

// Rotas de Endereço
routes.get("/endereco", EnderecoController.index);

// Rotas de Registro
routes.post("/registro", RegistroController.store);
routes.get("/registro", RegistroController.index);

// Rotas Tipo Causa e Registro
routes.post("/tipocausaregistro", TipoCausa_RegistroController.store);

// Rotas de Constituinte
routes.get("/constituinte", ConstituinteController.index);

// Rotas EXCLUSIVAS de admin
routes.use(adminMiddleware);

// Rotas de Usuário
routes.get("/usuario", UsuarioController.index);
routes.get("/usuarioadmin", UsuarioController.index_admin);
routes.get("/usuarioativado", UsuarioController.indexativados);
routes.get("/usuariodesativado", UsuarioController.indexdesativados);
routes.get("/usuario/:id", UsuarioController.show);

// Rotas de Telefone
routes.get("/telefone", TelefoneController.index);
routes.get("/telefone/:id", TelefoneController.show);

// Classe Causa
routes.post("/classecausa", ClasseCausaController.store);
routes.put("/classecausa/:id", ClasseCausaController.update);

// Tipo de Causa
routes.post("/tipocausa", TipoCausaController.store);
routes.put("/tipocausa/:id", TipoCausaController.update);

// Rotas de UF
routes.post("/uf", UFController.store);

// Rotas de Gênero
routes.post("/genero", GeneroController.store);
routes.put("/genero/:id", GeneroController.update);

// Rotas de Endereço
routes.put("/endereco/:id", EnderecoController.update);
routes.get("/endereco/:id", EnderecoController.show);

// Rotas de Registro
routes.put("/registro/:id", RegistroController.update);
routes.get("/registro/:id", RegistroController.show);

// Rotas de Constituinte 
routes.put("/constituinte/:id", ConstituinteController.update);
routes.get("/constituinte/:id", ConstituinteController.show);

// Rotas de Status
routes.patch("/statususuario/:id", StatusController.updateusuario);
routes.patch("/adminusuario/:id", StatusController.adminusuario);
routes.patch("/statusregistro/:id", StatusController.updateregistro);

// Rotas de Gerar PDF
routes.post("/pdf/:id", GerarEnviarPDFController.gerarenviarpdf);

// Rotas de Admin
routes.post("/cadastro-admin", UsuarioController.store_admin);

// Rotas de EstadoCivil
routes.post("/estadocivil", EstadoCivilController.store);
routes.put("/estadocivil/:id", EstadoCivilController.update);

// Rotas de Gênero
routes.post("/genero", GeneroController.store);
routes.put("/genero/:id", GeneroController.update);

module.exports = routes;