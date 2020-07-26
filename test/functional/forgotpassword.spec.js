const { test, trait } = use("Test/Suite")("Session");

const Mail = use("Mail");
const Hash = use("Hash");

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
  const email = "matheus@gmail.com";

  const user = await Factory.model("App/Models/User").create({ email });

  await client.post("/forgot").send({ email }).end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();
  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: "forgotpassword",
  });
});

test("it should be able to reset password", async ({ assert, client }) => {
  const email = "matheus@gmail.com";
  const user = await Factory.model("App/Models/User").create({ email });
  const userToken = await Factory.model("App/Models/Token").make({
    type: 'forgotpassword'
  });

  await user.tokens().save(userToken);

  const response = await client
    .post("/reset")
    .send({
      token: userToken.token,
      password: "123456",
      password_confirmation: "123456",
    })
    .end();

  response.assertStatus(204);

  await user.reload()
  const checkPassword = await Hash.verify("123456", user.password);
  assert.isTrue(checkPassword);
});
