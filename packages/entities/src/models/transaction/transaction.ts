export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  recipientId: string;
  senderId: string;
  createdAt: Date;
}
