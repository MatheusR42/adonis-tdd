const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should create a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/workshops')
    .send({
      title: 'Workshop 01',
      description: 'Description of workshop 01',
      user_id: user.id,
      section: 1,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});
