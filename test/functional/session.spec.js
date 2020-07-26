const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return a JWT token when session is created', async ({
  assert,
  client,
}) => {
  const userLogin = {
    email: 'matheus@gmail.com',
    password: '123456',
  };

  await Factory.model('App/Models/User').create(userLogin);

  const response = await client.post('/sessions').send(userLogin).end();
  response.assertStatus(200);
  assert.exists(response.body.token);
});
