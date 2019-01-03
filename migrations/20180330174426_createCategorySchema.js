
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.increments('cid').primary();
      table.string('title');
      table.text('description', 'longtext');
    }),

    knex.schema.createTable('category_data', (table) => {
      table.integer('cid').unsigned().notNullable().references('cid')
        .inTable('categories')
        .onDelete('CASCADE')
        .index();
      table.integer('tid').unsigned().notNullable().references('tid')
        .inTable('tasks')
        .onDelete('CASCADE')
        .index();
      table.integer('pid').unsigned().notNullable().references('pid')
        .inTable('projects')
        .onDelete('CASCADE')
        .index();
    }),

    knex.schema.createTable('category_costs', (table) => {
      table.integer('cid').unsigned().notNullable().references('cid')
        .inTable('categories')
        .onDelete('CASCADE')
        .index();
      table.integer('pid').unsigned().notNullable().references('pid')
        .inTable('projects')
        .onDelete('CASCADE')
        .index();
      table.integer('estimated_hours');
      table.integer('low_estimated_hours');
      table.integer('high_estimated_hours');
      table.integer('low_estimated_cost');
      table.integer('high_estimated_cost');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('category_data'),
    knex.schema.dropTable('category_costs'),
  ]);
};
