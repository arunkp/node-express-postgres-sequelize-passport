import config from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import bodyParser from "body-parser";
import bookRoutes from "./routes/BookRoutes";
import userRoutes from "./routes/UserRoutes";
const redis = require("redis");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
import database from "./models";
import cors from "cors";
const LocalStrategy = require("passport-local").Strategy;

config.config();

const redisClient = redis.createClient();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      let user = await database.User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        if (bcrypt.compareSync(password, user.dataValues.password)) {
          return done(null, user.dataValues);
        } else {
          return done(null, false, { message: "Invalid credentials.\n" });
        }
      } else {
        return done(null, false, { message: "Invalid credentials.\n" });
      }
    }
  )
);

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (userInfo, done) => {
  console.log(userInfo);
  const user = await database.User.findOne({
    where: {
      email: userInfo.email,
    },
  });
  return done(null, user);
});

const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
    }),
    name: "_redisDemo",
    secret: process.env.SECRET,
    resave: false,
    cookie: { secure: false, maxAge: 160000 }, // Set to secure:false and expire in 1 minute for demo purposes
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport config
// require("./config/passport")(passport);

const port = process.env.PORT || 8000;
// when a random route is inputed

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.status(200).send();
  }
);

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  console.log("auth==>", req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect("/");
}

app.use("/api/v1/books", isAuthenticated, bookRoutes);
app.use("/api/v1/auth", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
