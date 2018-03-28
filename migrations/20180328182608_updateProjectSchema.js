
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
      table.integer('estimated_hours');
      table.integer('low_estimated_hours');
      table.integer('high_estimated_hours');
      table.integer('low_estimated_cost');
      table.integer('high_estimated_cost');
    })
  ]);
};

exports.down = function(knex, Promise) {

};
