import { NextFunction, Request, Response } from "express";
import { AccountService } from "../services/account.service";
import { DepositService } from "../services/deposit.service";

export class DepositController {
    public accountService: AccountService;
    public depositService: DepositService;

    constructor() {
        this.accountService = new AccountService();
        this.depositService = new DepositService();
    }

    public Deposit = async (req: Request, res: Response, next: NextFunction) => {
        const { id, value } = req.body;
        if (!id || !value) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            const userFound = await this.accountService.getUserById(id);
            if (userFound.status === false) {
                return res.status(400).json({ message: "User deactivated" });
            }
            const newBalance = await this.depositService.Deposit(userFound, value);
            return res.status(200).json({ message: "Deposit successfully", balance: newBalance });
        } catch (error) {
            next(error);
        }
    }
}