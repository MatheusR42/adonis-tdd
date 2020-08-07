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

test('it should to list the workshops', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  //make create the instance but do not insert in db
  const workshop = await Factory.model('App/Models/Workshop').make();

  await user.workshops().save(workshop);

  const response = await client
    .get('/workshops')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body[0].title, workshop.title);
  assert.equal(response.body[0].user.id, user.id);
});

test('it should to list a single workshop', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();
  await user.workshops().save(workshop);

  const response = await client
    .get('/workshops/'+workshop.id)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, workshop.title);
  assert.equal(response.body.user.id, user.id);
});
