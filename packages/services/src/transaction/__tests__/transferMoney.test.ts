import { transferMoney } from "../transferMoney";
import { UserSchema } from "@tap/entities";

jest.mock('@tap/entities', () => ({
  UserSchema: {
    findOneBy: jest.fn(),
    save: jest.fn()
  }
}));

describe('transferMoney service', () => {
  const mockSender = {
    id: '1',
    email: 'sender@example.com',
    balance: 200,
    save: jest.fn(),
  };

  const mockRecipient = {
    id: '2',
    email: 'recipient@example.com',
    balance: 100,
    save: jest.fn(),
  };

  it('debería realizar la transferencia si el saldo es suficiente', async () => {
    // Mockear las respuestas de la base de datos
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockSender); // Remitente
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockRecipient); // Destinatario

    const result = await transferMoney('valid-token', 'recipient@example.com', 100);

    expect(result.transaction.amount).toBe(100);
    expect(mockSender.balance).toBe(100);  // Saldo después de la transferencia
    expect(mockRecipient.balance).toBe(200); // Saldo del destinatario después de la transferencia
  });

  it('debería lanzar un error si el saldo es insuficiente', async () => {
    // Mockear el remitente con saldo insuficiente
    mockSender.balance = 50;
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockSender);

    await expect(transferMoney('valid-token', 'recipient@example.com', 100))
      .rejects
      .toThrow('Saldo insuficiente');
  });
});
