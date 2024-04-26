import { Router } from "express";
import { AccountController } from "../controller/accountController";
import { DepositController } from "../controller/depositController";
import { WithdrawController } from "../controller/withdrawController";
import { TransactionsController } from "../controller/transactionsController";


const router = Router();
const accountController = new AccountController();
const depositController = new DepositController();
const withdrawController = new WithdrawController();
const transactionController = new TransactionsController();
//Account Routes
router.get("/account/count", accountController.getCount)
router.post("/account/new", accountController.CreateUser)
router.delete("/account/desativate/:id", accountController.DesativateAccount)
router.get("/account/get/:id", accountController.GetUserById)

//Deposits Routes
router.post("/deposit", depositController.Deposit)

//Withdraw Routes
router.post("/withdraw", withdrawController.Withdraw)

//Transactions Routes
router.post("/transactions", transactionController.newTransaction)
export { router }