import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import logging from "./config/logging";
import mahasiswaRoutes from "./routes/mahasiswa";
import dosenRoutes from "./routes/dosen";
import taRoutes from "./routes/ta";
import authRoutes from "./routes/auth";

const NAMESPACE = "Server";
const app = express();

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api", mahasiswaRoutes);
app.use("/api", dosenRoutes);
app.use("/api", taRoutes);
app.use("/api/auth", authRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

app.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running at http://${config.server.hostname}:${config.server.port}`
  )
);
