import Debug from "debug";

const httpDebug = Debug("http");
const errorDebug = Debug("error");
const wwwDebug = Debug("api:www");
const dbDebug = Debug("api:db");
const appDebug = Debug("api:app");
const configDebug = Debug("api:config");
const syncDebug = Debug("api:sync");

export {
  httpDebug,
  wwwDebug,
  errorDebug,
  dbDebug,
  configDebug,
  appDebug,
  syncDebug
};
