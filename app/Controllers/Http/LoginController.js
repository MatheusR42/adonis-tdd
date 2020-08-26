'use strict'
const User = use('App/Models/User')

class LoginController {
  async redirect ({ ally }) {
    await ally.driver('facebook').redirect()
  }

  async callback ({ ally, auth, response }) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        name: fbUser.getName(),
        social_avatar: fbUser.getAvatar(),
        token: fbUser.getAccessToken(),
        login_source: 'facebook'
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      const { token } = await auth.generate(user)

      return { token }
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Unable to authenticate. Try again later' });
    }
  }
}

module.exports = LoginController
