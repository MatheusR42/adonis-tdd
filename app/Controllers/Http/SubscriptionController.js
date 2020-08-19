'use strict';

class SubscriptionController {
  async store({ response, params, auth }) {
    const user = await auth.getUser();
    const { workshop_id } = params;

    await user.subscriptions().attach(workshop_id);

    return response.status(201).send();
  }
}

module.exports = SubscriptionController;
