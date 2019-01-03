
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('uncertainity_factors', (table) => {
      table.increments('ufid').primary();
      table.integer('pid').unsigned().notNullable().references('pid')
        .inTable('projects')
        .onDelete('CASCADE')
        .index();
      table.string('title');
      table.integer('points');
      table.decimal('lower_multiplier');
      table.decimal('heigher_multiplier');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('uncertainity_factors'),
  ]);
};
