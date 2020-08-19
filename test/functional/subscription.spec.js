const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to subscribe to a workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  const response = await client
    .post(`/workshops/${workshop.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(201);

  const subscriptionWorkshop = await user.subscriptions().first();

  assert.equal(subscriptionWorkshop.id, workshop.id);
});
