import { Router } from "express";
import {addJob,getAllJobs,getMyJobs ,getSingleJob,updateJob,deleteJob, pay ,getPaymentById} from "../controllers/jobs";
import { authMiddleware } from "@leetconnect/shared";

const router = Router();

router.post("/addjob",  authMiddleware , addJob);
router.get("/my-jobs", authMiddleware, getMyJobs);
router.get("/getalljobs", getAllJobs);
router.post("/payments/:id/pay", pay);
router.get("/payments/:id", getPaymentById);
router.get("/:id", getSingleJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);


export default router;
