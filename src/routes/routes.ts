import { Router } from "express";
import { AccountController } from "../controller/accountController";
import { DepositController } from "../controller/depositController";


const router = Router();
const accountController = new AccountController();
const depositController = new DepositController();

//Account Routes
router.get("/account/count", accountController.getCount)
router.post("/account/new", accountController.CreateUser)
router.delete("/account/desativate/:id", accountController.DesativateAccount)
router.get("/account/get/:id", accountController.GetUserById)

//Deposits Routes
router.post("/deposit", depositController.Deposit)

export { router }