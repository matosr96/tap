import { getTransactionHistory } from "../getTransactionHistory";
import { UserSchema, TransactionSchema } from "@tap/entities";

// Mockear la base de datos
jest.mock('@tap/entities', () => ({
  UserSchema: {
    findOneBy: jest.fn(),
  },
  TransactionSchema: {
    find: jest.fn(),
  }
}));

describe('getTransactionHistory service', () => {
  const mockUser = {
    id: '1',
    email: 'user@example.com'
  };

  const mockTransactions = [
    { id: '1', senderId: '1', recipientId: '2', amount: 100, createdAt: new Date() },
    { id: '2', senderId: '2', recipientId: '1', amount: 50, createdAt: new Date() }
  ];

  it('debería devolver el historial de transacciones', async () => {
    (UserSchema.findOneBy as jest.Mock).mockResolvedValue(mockUser);
    (TransactionSchema.find as jest.Mock).mockResolvedValue(mockTransactions);

    const result = await getTransactionHistory('valid-token');
    expect(result.transactions).toEqual(mockTransactions);
  });
});
