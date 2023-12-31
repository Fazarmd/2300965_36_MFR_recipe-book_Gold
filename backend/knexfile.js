const knex = require("knex");

module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://root:root@localhost:5432/recipe-book",
    searchPath: ["knex", "public"],
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

// Create and export the knex instance
module.exports.knexInstance = knex(module.exports.development); // Using the development configuration
