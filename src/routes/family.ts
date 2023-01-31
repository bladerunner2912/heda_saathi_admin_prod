import express from "express";

import controller from "../controllers/family";

const router = express.Router();

router.post("/create", controller.createFamiy);

router.post("/family/", controller.fetchFamily);

router.get("/get/", controller.fetchFamilies);

router.patch("/update/:familyId", controller.updateFamily);

router.delete("/delete/:familyId", controller.delteFamily);

export = router;
