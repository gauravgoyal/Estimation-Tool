
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('pid').primary();
      table.string('title');
      table.text('description', 'longtext');
      table.integer('created');
      table.integer('updated');
      table.integer('deleted');
    }),

    knex.schema.createTable('rates', function(table) {
      table.increments('rid').primary();
      table.string('category');
      table.string('role');
      table.integer('rate');
    }),

    knex.schema.createTable('tasks', function(table) {
      table.increments('tid').primary();
      table.integer('pid').unsigned().notNullable().references('pid').inTable('projects').onDelete('CASCADE').index();
      table.integer('rid').unsigned().notNullable().references('rid').inTable('rates').onDelete('CASCADE').index();
      table.string('title');
      table.integer('confidence');
      table.integer('hours_low');
      table.integer('hours_high');
      table.text('assumptions', 'longtext');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('rates'),
    knex.schema.dropTable('tasks')
  ]);
};
