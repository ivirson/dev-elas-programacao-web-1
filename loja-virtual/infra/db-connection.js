const sqlite3 = require("sqlite3");
const path = require("path");

module.exports = (filePath) => {
  return new sqlite3.Database(path.resolve(filePath));
}