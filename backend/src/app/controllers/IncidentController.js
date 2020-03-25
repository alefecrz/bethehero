import crypto from 'crypto';
import Incidents from '../models/Incidents';

class IncidentsController {
  async index(req, res) {
    const incidents = await Incidents.query().select('*');
    return res.json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const id = crypto.randomBytes(10).toString('HEX');
    const ong_id = req.headers.authorization;

    try {
      await Incidents.query().insert({
        title,
        description,
        value,
        ong_id,
      });

      return res.json({ id, title, description, value, ong_id });
    } catch (err) {
      return res.status(err.statusCode).json({ error: err });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await Incidents.query()
      .where('id', id)
      .select('ong_id')
      .first();

    if (ong_id !== incident.ong_id) {
      return res.status(401).json({ erro: 'Operation not permitted.' });
    }

    await Incidents.query().where('id', id).delete();

    return res.status(204).send();
  }
}

export default new IncidentsController();
