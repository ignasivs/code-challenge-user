import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import routesV1 from "./v1/routes/index";
import path from "path";
import i18n from "i18n";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

// === Middlewares definition ===
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


//Configure translations
i18n.configure({
  locales: ["en", "es"],
  directory: `${__dirname}/../locales`,
  defaultLocale: "en",
  cookie: "accept-language"
});

app.use(i18n.init);

app.use("/v1/", routesV1);
app.use("/", routesV1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  });
});

// export default app;
module.exports = app;
