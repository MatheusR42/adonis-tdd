'use strict'

const Helpers = use('Helpers');

class ProfilleController {
  async update({ request, auth }) {
    const user = await auth.getUser();

    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    });

    await avatar.move(Helpers.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${avatar.subtype}`
    })

    user.avatar = avatar.fileName;
    await user.save();

    return user;
  }
}

module.exports = ProfilleController
