import { NextFunction, Request, Response, Router } from "express";
import { prismaClient } from "../utils/prismaClient";
import { Accounts } from "@prisma/client";
import { AccountService } from "../services/account.service";




export class AccountController {

    public async getCount(req: Request, res: Response) {
        return res.status(200).json({ message: await prismaClient.accounts.count() })
    }

    public async CreateUser(req: Request, res: Response, next: NextFunction) {
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
            let accountService = new AccountService()
            const userCreated = await accountService.CreateUser(data)
            return res.status(200).json({ message: "successfully created a new User", id: userCreated.id })
        } catch (error) {
            next(error)
        }
    }
}