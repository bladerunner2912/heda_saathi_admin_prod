import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/create", controller.createUser);

router.post("/loginUser", controller.loginUser);

router.post("/fetchMembers", controller.fetchMembers);

router.post("/searchMembers", controller.searchMembers);

router.post("/sendOtp", controller.sendOtp);

// // router.get("/chill", controller.changeprofessionfieldquery);

router.get("/get/:userId", controller.findUser);

router.get("/get/", controller.findAllUser);

router.get("/birthdayAnniversary", controller.fetchBirthdayAnniversay);

router.post("/update/:userId", controller.updateUser);

router.delete("/delete/:userId", controller.deleteUser);

export = router;
