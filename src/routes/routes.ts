import { Router } from "express";
import { AccountController } from "../controller/accountController";


const router = Router();
const accountController = new AccountController();


//Account Routes
router.get("/account/count", accountController.getCount)
router.post("/account/new", accountController.CreateUser)
router.delete("/account/desativate/:id", accountController.DesativateAccount)
router.get("/account/get/:id", accountController.GetUserById)


export { router }