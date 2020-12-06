import config from "dotenv";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import bookRoutes from "./routes/BookRoutes";
import userRoutes from "./routes/UserRoutes";
import cors from "cors";

config.config();

const app = express();

app.use(cors());

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
