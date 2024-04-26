import { Accounts } from "@prisma/client";
import { prismaClient } from "../utils/prismaClient";

export class TransactionsService {
    private client = prismaClient;

    public async NewTransaction(reciever: Partial<Accounts>, sender: Partial<Accounts>, value: number) {

        this.client.accounts.update({
            where: {
                id: sender.id
            },
            data: {
                balance: sender.balance as number - value
            }
        }).catch((err) => {
            throw new Error(`Error updating sender balance: ${err}`)
        })

        this.client.accounts.update({
            where: {
                id: reciever.id
            },
            data: {
                balance: reciever.balance as number + value
            }
        }).catch((err) => {
            throw new Error(`Error updating reciever balance: ${err}`)
        })
        return await this.client.transactions.create({
            data: {
                amount: value,
                sender: {
                    connect: {
                        id: sender.id
                    }
                },
                receiver: {
                    connect: {
                        id: reciever.id
                    }
                }
            }
        }).catch((err) => {
            throw new Error(`Error creating transaction: ${err}`)
        })
    }
}