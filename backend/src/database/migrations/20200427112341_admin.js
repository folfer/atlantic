
exports.up = function(knex) {
  return knex.schema.createTable('admin', function (table) {
    table.string('id').primary();
    table.string('admname').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin')
};

