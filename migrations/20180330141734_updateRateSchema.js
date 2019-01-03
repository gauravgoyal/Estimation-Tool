
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('rates', (table) => {
      table.string('code');
    }),
  ]);
};

exports.down = function (knex, Promise) {

};
