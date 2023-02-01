import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import userRoutes from "./routes/user";
import familyRoutes from "./routes/family";
import { MongoClient } from 'mongodb';

const router = express();

const client = new MongoClient(config.mongo.url);

client
  .connect()
  .then(() => {
    Logging.info("Connected To Database");
    startServer();
  })
  .catch((error) => {
    Logging.error(`Unable to connect to datanbase ${error}`);
  });

const startServer = () => {
  router.use((req, res, next) => {
    // Log the Request//

    Logging.info(
      `Incoming --> Method : [${req.method}] + URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming --> Method : [${req.method}] + URL : [${req.url}] - IP : [${req.socket.remoteAddress}] - Status : [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json()); //making sure all data we getting is in json.

  //Rules of our API//
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Origin",
      "Origin, X-Requested-With,Content Type ,Accept,Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });

  /*Routes */
  router.use("/users", userRoutes);
  router.use("/families", familyRoutes);

  /*HealthCheck*/
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /*Error Handling*/
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

 var servers =  http
    .createServer(router)
    .listen(config.server.port, () =>
    {  
      Logging.info(`Server is running on port ${config.server.port}`)

       });


// io = require("socket.io")(servers);
//     io.on("connect",(socket: any) => {
//       console.log(socket.id);
//       console.log('connected')
//       socket.on('/test',(msg :String) => {
//           console.log(msg);
//      })
// });
};
