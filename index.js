import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// // Sinkronisasi database
// (async () => {
//   await db.sync();
// })();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World from backend" });
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(userRoutes);
app.use(jobRoutes);
app.use(applicantRoutes);
app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running...");
});
