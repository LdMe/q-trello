import {Router} from "express";

import userRouter from "./userRouter.js";
import projectRouter from "./projectRouter.js";
import taskRouter from "./taskRouter.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",userRouter);
router.use("/projects",projectRouter);
router.use("/tasks",taskRouter);
export default router;