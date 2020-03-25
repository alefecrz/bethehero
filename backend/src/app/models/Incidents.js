import { Model } from 'objection';

import Ong from './Ongs';

class Incident extends Model {
  static init(conn) {
    super.knex(conn);
  }

  static get tableName() {
    return 'incidents';
  }

  static get relationMappings() {
    return {
      ongs: {
        relation: Model.HasManyRelation,
        modelClass: Ong,
        join: {
          from: 'incidents.id',
          to: 'ongs.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description', 'value'],

      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        value: { type: 'number' },
      },
    };
  }
}

export default Incident;
