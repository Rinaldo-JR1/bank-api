
import { WithdrawService } from "../services/withdraw.service";
import { AccountService } from "../services/account.service";
import { NextFunction, Request, Response } from "express";

export class WithdrawController {
    public withdrawService: WithdrawService
    public accountService: AccountService
    constructor() {
        this.withdrawService = new WithdrawService()
        this.accountService = new AccountService()
    }
    public Withdraw = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, value } = req.body;
            if (!id || !value) {
                return res.status(400).json({ message: "Missing fields" })
            }
            const userFound = await this.accountService.getUserById(id)
            if (userFound.status === false) {
                return res.status(400).json({ message: "User deactivated" })
            }
            //Add max margin to withdraw
            if (userFound.balance as number + 100 < value) {
                return res.status(400).json({ message: "Insufficient balance" })
            }
            const newBalance = await this.withdrawService.Withdraw(userFound, value)
            return res.status(200).json({ message: "Withdraw successfully", balance: newBalance })
        } catch (error) {
            next(error)
        }
    }

}