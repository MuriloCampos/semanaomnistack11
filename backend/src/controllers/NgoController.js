const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async store(req, res) {
    const { name, email, whatsapp, city, fu } = req.body;

    const id = generateUniqueId();

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
