import express from "express";
import controller from "../controllers/advertisment";

const router = express();

router.get('/fetchAdvertisments', controller.fetchAdvertisment);

export default router;