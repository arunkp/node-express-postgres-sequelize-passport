require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "123",
    database: "books",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "123",
    database: "books_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "PG@123",
    database: "books",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
