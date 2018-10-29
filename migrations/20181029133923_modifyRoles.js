
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('rates', function(table) {
          table.integer('resource_type');
          table.integer('role_type');
        })
      ]);
};

exports.down = function(knex, Promise) {
  
};
