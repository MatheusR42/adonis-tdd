'use strict';

const Helpers = use('Helpers');

class ProfilleController {
  async show({ auth }) {
    const user = await auth.getUser();

    return user;
  }

  async update({ request, auth }) {
    const data = request.only(['name', 'title', 'bio', 'github', 'linkedin']);

    const user = await auth.getUser();

    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb',
    });

    if (avatar) {
      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
      });

      user.avatar = avatar.fileName;
    }

    user.merge(data);

    const password = request.input('password');

    if (password) {
      user.password = password;
    }

    await user.save();

    return user;
  }
}

module.exports = ProfilleController;
