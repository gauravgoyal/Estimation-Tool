
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('uncertainity_factors', function(table) {
      table.increments('ufid').primary();
      table.string('title');
      table.integer('points');
      table.decimal('lower_multiplier');
      table.decimal('heigher_multiplier');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('uncertainity_factors')
  ]);
};
