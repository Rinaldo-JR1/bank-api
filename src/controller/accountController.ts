import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../utils/prismaClient";
import { Accounts } from "@prisma/client";
import { AccountService } from "../services/account.service";

export class AccountController {
    public accountService: AccountService
    constructor() {
        this.accountService = new AccountService()
    }
    public getCount = async (req: Request, res: Response) => {
        return res.status(200).json({ message: await prismaClient.accounts.count() })
    }

    public CreateUser = async (req: Request, res: Response, next: NextFunction) => {
        const data: Partial<Accounts> = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf,
            balance: 0
        }
        if (!data.name || !data.email || !data.password || !data.cpf) {
            return res.status(400).json({ message: "Missing fields" })
        }
        try {
            const userCreated = await this.accountService.CreateUser(data)
            return res.status(200).json({ message: "successfully created a new User", id: userCreated.id })
        } catch (error) {
            next(error)
        }
    }
    public DesativateAccount = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "Missing fields" })
        }
        try {
            const userFound = await this.accountService.getUserById(id);
            if (userFound.status === false) {
                return res.status(400).json({ message: "User already deactivated" })
            }
            if (userFound.balance === 0) {
                const userUpdated = await this.accountService.DactivateAccount(id);
                return res.status(200).json({ message: "successfully deactivate User" })
            }
        } catch (error) {
            next(error)
        }
    }
    public GetUserById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "Missing fields" })
        }
        try {
            const userFound = await this.accountService.getUserById(id);
            return res.status(200).json({ message: "User found", user: userFound })
        } catch (error) {
            next(error)
        }
    }
}