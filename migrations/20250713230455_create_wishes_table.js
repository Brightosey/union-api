export async function up(knex) {
  await knex.schema.createTable("wishes", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.text("message");
    table.string("gif_url");
    table.integer("likes").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable("wishes");
}
