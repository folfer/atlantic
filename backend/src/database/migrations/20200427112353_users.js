
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.increments();

      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('cellphone').notNullable();
      table.string('address').notNullable();
      table.date('registerdate').notNullable();

      table.string('admin_id').notNullable();

      table.foreign('admin_id').references('id').inTable('admin');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};