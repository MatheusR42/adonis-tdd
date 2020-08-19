'use strict';
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

class SubscriptionController {
  async store({ response, params, auth }) {
    const user = await auth.getUser();
    const { workshop_id } = params;

    const workshop = await Workshop.find(workshop_id);
    const checkSubscription = await user
      .subscriptions()
      .where('section', workshop.section)
      .first();

    if (checkSubscription) {
      return response
        .status(400)
        .json({
          error:
            'You cannot subscribe to more than one workshop in the same section',
        });
    }

    await user.subscriptions().attach(workshop_id);

    return response.status(201).send();
  }

  async destroy({ params, auth }) {
    const user = await auth.getUser();
    const { workshop_id } = params;

    await user.subscriptions().detach(workshop_id);
  }
}

module.exports = SubscriptionController;
