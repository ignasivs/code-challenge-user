import process from "process";
import minimist from "minimist";
import { configDebug } from "../debuggers";

// Arguments given by node (-- -p=3000 -e=PROD)
const argv = minimist(process.argv.slice(2));
configDebug("arguments given: ", argv);

const configSequelizeJs = {
  development: {
    dialect: "sqlite",
    storage: `./db/${argv.namesqlite ||
      process.env.namesqlite ||
      "codeChallenge-test.db"}`
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    dialect: "sqlite",
    storage: `./db/${argv.namesqlite ||
      process.env.namesqlite ||
      "codeChallenge.db"}`
  }
};

module.exports = configSequelizeJs;
