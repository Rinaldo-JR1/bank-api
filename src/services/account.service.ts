import { Accounts } from "@prisma/client";
import { prismaClient } from "../utils/prismaClient";
export class AccountService {
    private client = prismaClient;
    public async getCount(): Promise<number> {
        return await this.client.accounts.count();
    }
    public async CreateUser(data: Partial<Accounts>): Promise<Accounts> {
        const createdAccount = await this.client.accounts.create({
            data: data as Accounts
        })
        if (createdAccount) {
            return createdAccount
        }
        throw new Error("Account not created")
    }

}