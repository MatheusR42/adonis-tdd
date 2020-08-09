'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

class WorkshopController {
  async index({ request, response }) {
    const workshops = await Workshop.query()
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
    const data = request.only(['title', 'description', 'user_id', 'section']);

    const workshop = await Workshop.create(data);

    return response.status(201).json(workshop);
  }

  async update({ request, params }) {
    const data = request.only(['title', 'description', 'user_id', 'section']);

    const workshop = await Workshop.find(params.id);

    workshop.merge(data);

    await workshop.save();

    return workshop;
  }
}

module.exports = WorkshopController;
