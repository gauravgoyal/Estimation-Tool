
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('tasks', (table) => {
      table.dropColumn('confidence');
      table.integer('ufid').unsigned().notNullable().references('ufid')
        .inTable('uncertainity_factors')
        .onDelete('CASCADE')
        .index();
      table.integer('estimated_hours');
      table.integer('rate_low');
      table.integer('rate_high');
    }),
  ]);
};

exports.down = function (knex, Promise) {

};
