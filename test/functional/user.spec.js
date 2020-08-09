const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Helpers = use('Helpers');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to update avatar', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .put('/profile')
    .loginVia(user, 'jwt')
    .attach('avatar', Helpers.tmpPath('test/avatar.jpeg'))
    .end();

  response.assertStatus(200);
  assert.exists(response.body.avatar);
});
