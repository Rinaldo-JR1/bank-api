import { Request, Response } from "express";
import { prismaClient } from "../utils/prismaClient";

export class AccountController {
    public async getCount(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: await prismaClient.account.count() })
    }
}