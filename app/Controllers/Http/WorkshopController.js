'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

class WorkshopController {
  async index({ request, response }) {
    //pega uma info do body ou query da request
    const section = request.input('section', 1);

    const workshops = await Workshop.query()
      .where('section', section)
      .with('user', (builder) => {
        builder.select(['id', 'name', 'avatar']);
      })
      .fetch();

    return workshops;
  }

  async show({ params }) {
    const workshop = await Workshop.find(params.id);
    //quando é um unico usamos o load
    await workshop.load('user');
    return workshop;
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'description',
      'user_id',
      'section',
      'color',
    ]);

    const workshop = await Workshop.create(data);

    return response.status(201).json(workshop);
  }

  async update({ request, params }) {
    const data = request.only([
      'title',
      'description',
      'user_id',
      'section',
      'color',
    ]);

    const workshop = await Workshop.find(params.id);

    workshop.merge(data);

    await workshop.save();

    return workshop;
  }

  async destroy({ params }) {
    const workshop = await Workshop.find(params.id);

    await workshop.delete();
  }
}

module.exports = WorkshopController;
