import { Router } from "express";
import { AccountController } from "../controller/accountController";


const router = Router();
const accountController = new AccountController();


router.get("/account/count", accountController.getCount)
router.post("/account/create", accountController.CreateUser)


export { router }