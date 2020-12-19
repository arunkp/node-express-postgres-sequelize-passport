import config from "dotenv";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import bookRoutes from "./routes/BookRoutes";
import userRoutes from "./routes/UserRoutes";
const cookieParser = require("cookie-parser");
import cors from "cors";

config.config();

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

app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

const port = process.env.PORT || 8000;
// when a random route is inputed

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.use(
  "/api/v1/books",
  passport.authenticate("jwt", { session: false }),
  bookRoutes
);
app.use("/api/v1/auth", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
