import process from "process";
import minimist from "minimist";
import { configDebug } from "../debuggers";

const argv = minimist(process.argv.slice(2));
configDebug("arguments given: ", argv);

const configJs = {
  portServer: argv.portServer || process.env.portServer || 7300
};

export default configJs;
