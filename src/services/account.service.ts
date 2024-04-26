import { Accounts } from "@prisma/client";
import { prismaClient } from "../utils/prismaClient";
import logger from "../utils/logger";
export class AccountService {
    private client = prismaClient;
    public async getCount(): Promise<number> {
        return await this.client.accounts.count();
    }
    public async CreateUser(data: Partial<Accounts>): Promise<Accounts> {
        const createdAccount = await this.client.accounts.create({
            data: data as Accounts
        }).catch((err) => {
            logger.error(`Error creating account: ${err}`)
        })
        if (createdAccount) {
            return createdAccount
        }
        throw new Error("Account not created")
    }
    public async getUserById(id: string): Promise<Partial<Accounts>> {
        const user = await this.client.accounts.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                cpf: true,
                email: true,
                name: true,
                balance: true,
                createdAt: true,
                updatedAt: true,
                status: true,
            }
        })
        if (user) {
            return user
        }
        throw new Error("User not found")
    }
    public async DactivateAccount(id: string): Promise<Accounts> {
        const accountDactivated = await this.client.accounts.update({
            where: {
                id: id
            },
            data: {
                status: false,
            }
        })
        if (accountDactivated) {
            return accountDactivated
        }
        throw new Error("User not found")
    }
}