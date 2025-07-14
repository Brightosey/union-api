/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wishes", function (table) {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("name"); // Name of the person submitting
    table.text("message").notNullable(); // Message content
    table.string("gif_url"); // Optional: GIF URL (from Giphy)
    table.integer("likes").defaultTo(0); // Like counter (starts at 0)
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("wishes");
};
