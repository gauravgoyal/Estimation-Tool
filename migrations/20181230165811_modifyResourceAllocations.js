
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('resource_allocations', function(table) {
            table.dropPrimary();
            table.integer('row').defaultTo(0);
            table.primary(['res_id', 'rid', 'week', 'row']);
        })
    ]);
};

exports.down = function(knex, Promise) {
  
};
