import process from "process";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { configSequelizejs } from "../../config";
import { configDebug } from "../../debuggers";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "production";

const config = configSequelizejs[env];
configDebug("Environment: ", env);
configDebug("Config loaded: ", config);
console.log("Environment: ", config);

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Comprueba que los .js de models/ sean correctos y los importa
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
