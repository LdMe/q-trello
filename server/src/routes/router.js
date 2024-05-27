import {Router} from "express";

import userRouter from "./userRouter.js";
import projectRouter from "./projectRouter.js";
import taskRouter from "./taskRouter.js";
import authRouter from "./authRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",isAdmin,userRouter);
router.use("/projects",isAuthenticated,projectRouter);
router.use("/tasks",taskRouter);
router.use("/",authRouter);
export default router;