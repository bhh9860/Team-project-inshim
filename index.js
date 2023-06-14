const express = require("express");
const app = express();
const port = 8800;
const cookieParser = require("cookie-parser");
const session = require("express-session");

//템플릿
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use(express.static("public"));

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 30 },
  })
);

//routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const essayRouter = require("./routes/essay");
const routeRouter = require("./routes/route");

app.use("/inshim", indexRouter);
app.use("/inshim", userRouter);
app.use("/inshim", essayRouter);
app.use("/inshim", routeRouter);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
