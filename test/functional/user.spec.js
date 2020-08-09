const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Helpers = use('Helpers');
const Hash = use('Hash');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to update profile', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'Matheus',
    password: 'abc',
  });

  const response = await client
    .put('/profile')
    .loginVia(user, 'jwt')
    .field('name', 'Jorge')
    .field('password', '1234')
    .field('password_confirmation', '1234')
    .attach('avatar', Helpers.tmpPath('test/avatar.jpeg'))
    .end();

  response.assertStatus(200);
  assert.exists(response.body.avatar);
  assert.equal(response.body.name, 'Jorge');

  await user.reload()

  assert.isTrue(await Hash.verify('1234', user.password));
});
