const { test, trait } = use("Test/Suite")("Session");

const Mail = use('Mail')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("it should send a email with reset password instructions", async ({
  assert,
  client,
}) => {
  Mail.fake();

  const forgotenPayload = {
    email: "matheus@gmail.com",
  };

  await Factory.model("App/Models/User").create(forgotenPayload);

  const response = await client.post("/forgot").send(forgotenPayload).end();
  response.assertStatus(204);
  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, forgotenPayload.email)
});
