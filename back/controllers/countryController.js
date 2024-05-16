const { Country } = require('../models/models');
const ApiError = require('../error/ApiError');


class CountryController {
  async create(req, res, next) {
    try {
      const { country } = req.body;
      const data = await Country.create({
        country
      });
      return res.json(data);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const data = await Country.findAndCountAll();
    return res.json(data);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const data = await Country.findOne(
      {
        where: { id }
      }
    );
    return res.json(data);
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Country.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: 'Deleted successfully' });
      }
      throw new Error('Country not found');
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CountryController();
