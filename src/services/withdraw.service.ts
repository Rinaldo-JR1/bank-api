import { Accounts } from "@prisma/client";
import { prismaClient } from "../utils/prismaClient";

export class WithdrawService {
    private client = prismaClient;
    Withdraw = async (user: Partial<Accounts>, value: number) => {
        const withdraw = await this.client.withdraws.create({
            data: {
                amount: value,
                account: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
        if (withdraw) {
            const userUpdated = await this.client.accounts.update({
                where: {
                    id: user.id
                },
                data: {
                    balance: user.balance as number - value
                },
                select: {
                    balance: true
                }
            })
            if (!userUpdated) {
                throw new Error("Error updating balance")
            }
            return userUpdated.balance
        } else {
            throw new Error("Error creating withdraw")
        }
    }
}