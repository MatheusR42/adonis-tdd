'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSocialAuthSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      // alter table
      table.string('login_source');
      table.string('social_avatar');
      table.string('password').nullable().alter();
    });
  }

  down() {
    this.alter('users', (table) => {
      // reverse alternations
      table.dropColumn('login_source');
      table.dropColumn('social_avatar');
      table.string('password').notNullable().alter();
    });
  }
}

module.exports = UserSocialAuthSchema;
