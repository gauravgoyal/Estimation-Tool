
exports.up = function (knex, Promise) {
  return Promise.all([
     	knex.schema.createTable('global_rate', (table) => {
	     	table.increments('rid').primary();
	     	table.string('cost');
	     	table.string('role');
	     	table.integer('rate');
    	}),
   	]);
};

exports.down = function (knex, Promise) {

};
