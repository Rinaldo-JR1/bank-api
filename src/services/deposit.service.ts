import { Accounts } from "@prisma/client";
import { prismaClient } from "../utils/prismaClient";

export class DepositService {
    private client = prismaClient;

    public async Deposit(user: Partial<Accounts>, value: number) {
        const deposit = await this.client.deposits.create({
            data: {
                amount: value,
                account: {
                    connect: {
                        id: user.id
                    }
                }
            }
        }).catch((err) => {
            throw new Error(`Error creating deposit: ${err}`)
        })
        if (deposit) {
            const userUpdated = await this.client.accounts.update({
                where: {
                    id: user.id
                },
                data: {
                    balance: user.balance as number + value
                },
                select: {
                    balance: true
                }
            })
            if (userUpdated) {
                return userUpdated.balance
            } else {
                throw new Error("Error updating balance")
            }
        }
    }
}