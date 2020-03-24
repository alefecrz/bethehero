import express from 'express';

import routes from './router';

class app{
  constructor(){
    this.server = express();
    this.middleware();
    this.routes();
  }
  middleware(){
    this.server.use(express.json());
  }
  routes(){
    this.server.use(routes);
  }
}

export default new app().server;