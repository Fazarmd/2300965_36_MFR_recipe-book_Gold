/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recipe", (table) => {
    table.uuid("id").unique().notNullable().primary();
    table.text("title").notNullable();
    table.text("ingredients").notNullable();
    table.text("instruction").notNullable();
    table.text("caption", 150).notNullable();
    table.integer("category_id").references("id").inTable("category").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipe");
};
