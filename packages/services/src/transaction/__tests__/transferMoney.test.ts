import { transferMoney } from "../transferMoney";
import { UserSchema } from "@tap/entities";

jest.mock("@tap/entities", () => ({
  UserSchema: {
    findOneBy: jest.fn(),
    save: jest.fn(),
  },
}));

describe("transferMoney service", () => {
  const mockSender = {
    id: "1",
    email: "sender@example.com",
    balance: 200,
    save: jest.fn(),
  };

  const mockRecipient = {
    id: "2",
    email: "recipient@example.com",
    balance: 100,
    save: jest.fn(),
  };

  it("debería realizar la transferencia si el saldo es suficiente", async () => {
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockSender);
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockRecipient);

    const result = await transferMoney(
      "valid-token",
      "recipient@example.com",
      100
    );

    expect(result.transaction.amount).toBe(100);
    expect(mockSender.balance).toBe(100);
    expect(mockRecipient.balance).toBe(200);
  });

  it("debería lanzar un error si el saldo es insuficiente", async () => {
    mockSender.balance = 50;
    (UserSchema.findOneBy as jest.Mock).mockResolvedValueOnce(mockSender);

    await expect(
      transferMoney("valid-token", "recipient@example.com", 100)
    ).rejects.toThrow("Saldo insuficiente");
  });
});
