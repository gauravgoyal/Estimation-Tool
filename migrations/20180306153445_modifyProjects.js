
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
      table.string('creator');
      table.string('owner');
      table.string('reviewer');
      table.string('signer');
      table.integer('type');
      table.string('mlid');
      table.integer('complete');
      table.integer('completed');
    }),
    knex.schema.table('rates', function(table) {
      table.integer('pid').unsigned().notNullable().references('pid').inTable('projects').onDelete('CASCADE').index();
    })
  ]);
};

exports.down = function(knex, Promise) {

};
