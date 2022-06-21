var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

//Router 생성
/************************************/
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var memberRouter = require("./routes/member/member");
var boardRouter = require("./routes/board/board");
var loginRouter = require("./routes/login/login");
/************************************/

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Router 매핑
/********새로 만든 부분*********/

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/member", memberRouter);
app.use("/board", boardRouter);
app.use("/login", loginRouter);
/******************************/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
