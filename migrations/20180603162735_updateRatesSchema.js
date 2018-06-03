
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('rates', function(table) {
      table.string('cost');
      table.dropColumn('category');
      table.dropColumn('code');
    }),
    knex.schema.table('projects', function(table) {
      table.string('currency');
    })

  ]);
};

exports.down = function(knex, Promise) {

};
