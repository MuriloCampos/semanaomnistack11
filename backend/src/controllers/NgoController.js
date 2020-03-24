const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async store(req, res) {
    const { name, email, whatsapp, city, fu } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      fu,
    });

    return res.json({ id });
  },

  async index(req, res) {
    const ongs = await connection('ngos').select('*');

    return res.json(ongs);
  },
};
