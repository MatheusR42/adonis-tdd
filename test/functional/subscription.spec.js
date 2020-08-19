const User = require('../../app/Models/User');

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


test('it should not be able to subscribe to multiple workshops at same section', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop1 = await Factory.model('App/Models/Workshop').create({
    section: 1
  });
  const workshop2 = await Factory.model('App/Models/Workshop').create({
    section: 1
  });

  await user.subscriptions().attach(workshop1.id);

  const response = await client
    .post(`/workshops/${workshop2.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);

  const subscriptions = await user.subscriptions().count();

  assert.equal(subscriptions[0]['count(*)'], 1);
});

test('it should be able to unsubscribe a workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  await user.subscriptions().attach(workshop);

  const response = await client
    .delete(`/workshops/${workshop.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const subscriptionWorkshop = await user.subscriptions().first();

  assert.isNull(subscriptionWorkshop);
});
