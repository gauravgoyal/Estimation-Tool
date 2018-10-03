
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resource_plans', function(table) {
          table.integer('weeks').defaultTo(5);
          table.integer('lock').defaultTo(0);
        }),
      ]);
};

exports.down = function(knex, Promise) {
  
};
