'use strict'
const Antl = use('Antl');

class Profile {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      password: 'confirmed',
      avatar: 'required|file|file_ext:png,gif,jpg,jpeg,tiff,bmp|file_size:2mb|file_types:image'
    }
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Profile
