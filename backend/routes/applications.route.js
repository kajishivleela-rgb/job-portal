import express from "express";
import {applyJob,getAppliedJobs,getApplicants,updateApplicationStatus} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/getJobs").get(isAuthenticated,getAppliedJobs);
router.route("/getApplicants/:id").get(isAuthenticated,getApplicants);
router.route("/updateStatus/:id").post(isAuthenticated,updateApplicationStatus);

export default router;