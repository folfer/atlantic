
exports.up = function(knex) {
  return knex.schema.createTable('rent', function (table) {
      table.increments();
      
      table.string('namerent').notNullable();
      table.date('datainit').notNullable();
      table.date('dataover').notNullable();
      table.string('scaffolding').notNullable();
      table.string('prop').notNullable();
      table.decimal('debit').notNullable();

      table.string('admin_id').notNullable();

      table.foreign('admin_id').references('id').inTable('admin');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rent')
};
