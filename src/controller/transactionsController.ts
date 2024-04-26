import { NextFunction, Request, Response } from "express"
import { AccountService } from "../services/account.service"
import { TransactionsService } from "../services/transactions.service"

export class TransactionsController {
    private accountService: AccountService
    private transactionsService: TransactionsService
    constructor() {
        this.accountService = new AccountService()
        this.transactionsService = new TransactionsService()
    }
    public newTransaction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { recieverId, senderId, value } = req.body
            if (!recieverId || !senderId || !value) {
                return res.status(400).json({ message: "Missing fields" })
            }
            const reciever = await this.accountService.getUserById(recieverId)
            const sender = await this.accountService.getUserById(senderId)
            if (reciever.status === false || sender.status === false) {
                return res.status(400).json({ message: "User deactivated" })
            }
            if (sender.balance as number < value) {
                return res.status(400).json({ message: "Insufficient balance" })
            }
            const transactionInfo = await this.transactionsService.NewTransaction(reciever, sender, value)
            return res.status(200).json({ message: "Transaction successfully", balance: transactionInfo })
        } catch (error) {
            next(error)
        }
    }
}