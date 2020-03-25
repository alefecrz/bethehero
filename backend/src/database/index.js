import Knex from 'knex';

import databaseConfig from '../../knexfile';

import Ong from '../app/models/Ongs';

const models = [Ong];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Knex(databaseConfig.development);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
