/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('title');
      table
        .integer('avatar')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL') //se o arquivo for deletado aqui fica null
        .onUpdate('CASCADE') //se o arquivo for alterado replica aqui
      table.string('bio');
      table.string('github');
      table.string('linkedin');
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
