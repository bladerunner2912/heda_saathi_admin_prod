import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config";
import Logging from "./library/Logging";
import userRoutes from "./routes/user";
import familyRoutes from "./routes/family";
import advertismentRoutes from "./routes/advertisment";
import AWS from "aws-sdk";
import notificationRoutes from "./routes/notifications";

const router = express();

mongoose
  .connect(config.mongo.url)
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
  router.use("/advertisments", advertismentRoutes);
  router.use("/notifications", notificationRoutes);

  /*S3BUCKET INIT AND UPLOADPIC FUNCTION */
  // ! ANY OBJECT CALLED.
  const s3 = new AWS.S3({
    accessKeyId: config.awsBucket.accessKey,
    secretAccessKey: config.awsBucket.secretKey,
    signatureVersion: 'v4',
    region: 'ap-south-1'
  });

  router.post('/uploadPicUrl/', async (req, res) => {
    // Logging.info(req);
    const objectName = req.body.objectName;
    const objectType = req.body.objectType;
    const uid = req.body.userId;
    const params = {
      Bucket: config.awsBucket.bucketName,
      Key: objectName,
    }
    s3.getSignedUrl('getObject', params, (err, downloadUrl) => {
      if (err) {
        Logging.error(err);
        return res.send(err);
      }

      s3.getSignedUrl('putObject', params, async (err, uploadUrl) => {
        if (err) {
          Logging.error(err);
          return res.send(err);
        }
        return res.send({
          uploadUrl,
        });
      });
    });
  });

  router.get("/",(req,res,next) => {
    res.status(200).json({message : "Heda-Saathi-Admin-Prod"})
  })

  /*HealthCheck*/
  router.get("/ping", (_req, res, _next) =>
    res.status(200).json({ message: "pong" })
  );

  /*Error Handling*/
  router.use((_req, res, _next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () => {
      Logging.info(`Server is running on port ${config.server.port}`)

    });

}
  // io = require("socket.io")(servers);
  //     io.on("connect",(socket: any) => {
  //       console.log(socket.id);
  //       console.log('connected')
  //       socket.on('/test',(msg :String) => {
  //           console.log(msg);
  //      })
  // });

