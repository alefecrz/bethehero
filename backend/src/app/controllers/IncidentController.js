import Incidents from '../models/Incidents';

class IncidentsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const ong_id = req.headers.authorization;

    if(!ong_id) {
      return res.status(401).json({ error: "Operation not permitted."});
    }
    const [incidentsCount] = await Incidents.query().count();

    const incidents = await Incidents.query()
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .where('ong_id', ong_id)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', incidentsCount.count);

    return res.json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    try {
      await Incidents.query().insert({
        title,
        description,
        value,
        ong_id,
      });

      return res.json({ title, description, value, ong_id });
    } catch (err) {
      return res.status(401).json({ error: err });
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
