"use strict";

const { randomBytes } = require("crypto");
const { promisify } = require("util");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const Mail = use("Mail");
const Env = use("Env");

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input("email");
    const user = await User.findByOrFail("email", email);

    const random = await promisify(randomBytes)(16);
    const token = random.toString("hex");

    await user.tokens().create({
      token,
      type: "forgotpassword",
    });

    const resetUrl = `${Env.get("FRONT_URL")}/reset?token=${token}`;

    await Mail.send(
      "emails.forgotpassword",
      { name: user.name, token, resetUrl },
      (message) => {
        message
          .to(user.email)
          .from("oi@rocketseat.com")
          .subject("RS/XP - Recuperação de senha");
      }
    );
  }
}

module.exports = ForgotPasswordController;
