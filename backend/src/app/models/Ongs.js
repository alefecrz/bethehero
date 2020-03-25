import { Model } from 'objection';

class Ong extends Model {
  static init(conn) {
    super.knex(conn);
  }

  static get tableName() {
    return 'ongs';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'whatsapp', 'city', 'uf'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string', pattern: '^[A-Za-z ]+$' },
        email: {
          type: 'string',
          pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
        },
        whatsapp: { type: 'string', pattern: '^[0-9]+$' },
        city: { type: 'string', pattern: '^[A-Za-z]+$' },
        uf: {
          type: 'string',
          pattern: '[a-zA-Z]{2}$',
        },
      },
    };
  }
}

export default Ong;
