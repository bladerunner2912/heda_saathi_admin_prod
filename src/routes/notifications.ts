import express from "express";
import controller from "../controllers/notifications";
const router = express.Router();

router.post("/createNotification", controller.createNotification);
router.get("/fetchNotifications", controller.fetchNotifications);
router.post("/viewedANotification", controller.viewedANotification);

export default router;