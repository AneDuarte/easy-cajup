const Sequelize = require("sequelize");
const databaseConfig = require("../config/database");

const EstadoCivil = require("../app/models/EstadoCivil");
const Telefone = require("../app/models/Telefone");
const Constituinte = require("../app/models/Constituinte");
const Endereco = require("../app/models/Endereco");
const Usuario = require("../app/models/Usuario");
const ClasseCausa = require("../app/models/ClasseCausa");
const TipoCausa = require("../app/models/TipoCausa");
const Registro = require("../app/models/Registro");
const UF = require("../app/models/UF");
const Genero = require("../app/models/Genero");
const TipoCausa_Registro = require("../app/models/TipoCausa_Registro");

const models = [ EstadoCivil, Telefone, Endereco, Constituinte, Usuario, ClasseCausa, UF, TipoCausa, Registro, Genero, TipoCausa_Registro ];

class Database {

  constructor() {
    this.init();
  }

  init() {

    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();