const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");

require("./database");

class App {

  constructor() {
    
    this.server = express();
    this.server.engine('handlebars', exphbs());
    this.server.set('view engine', 'handlebars');
    this.middlewares();
    this.routes();
  
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

}

module.exports = new App().server;