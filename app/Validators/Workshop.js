'use strict';
const { rule } = use('Validator');
const Antl = use('Antl');

class Workshop {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: [rule('required')],
      description: [rule('required')],
      user_id: [rule('exists', ['users', 'id'])],
      section: [rule('required'), rule('in', [1, 2, 3])],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Workshop;
