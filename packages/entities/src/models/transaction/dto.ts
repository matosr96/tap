import { Transaction } from "./transaction";

export type createTransactionDto = Omit<Transaction, 'id'>;
export type updateTransactionDto = Partial<Transaction>;