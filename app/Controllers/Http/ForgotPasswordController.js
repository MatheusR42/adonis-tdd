"use strict";
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input("email");
    const user = await User.findByOrFail('email', email);

    await Mail.send("emails.forgotpassword", { name: user.name }, (message) => {
      message
        .to(user.email)
        .from("oi@rocketseat.com")
        .subject("RS/XP - Recuperação de senha");
    });
  }
}

module.exports = ForgotPasswordController;
