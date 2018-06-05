
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('resource_plans', function(table) {
      table.increments('res_id').primary();
      table.integer('pid').unsigned().notNullable().references('pid').inTable('projects').onDelete('CASCADE').index();
    }),
    knex.schema.table('projects', function(table) {
      table.integer('res_id').unsigned().references('res_id').inTable('resource_plans').onDelete('CASCADE').index();
    }),
    knex.schema.createTable('resource_allocations', function(table) {
      table.integer('res_id').unsigned().notNullable().references('res_id').inTable('resource_plans').onDelete('CASCADE').index();
      table.integer('rid').unsigned().notNullable().references('rid').inTable('rates').onDelete('CASCADE').index();
      table.integer('week');
      table.integer('hours');
      table.string('week_name');
      table.primary(['res_id', 'rid', 'week', 'hours']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resource_plans'),
    knex.schema.dropTable('resource_allocations'),
  ]);
};
