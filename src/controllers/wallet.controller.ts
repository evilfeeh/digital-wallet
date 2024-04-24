import { Iwallet } from "../interfaces/wallet";
import { Iuser } from "../interfaces/user";
import { UserController } from "./user.controller";
import { WalletRepository } from "../model/walletRepository";

export class Wallet {
  private walletRepository = new WalletRepository();
  private userController = new UserController();
  async create(user_id: Iuser["id"]): Promise<Iwallet> {
    try {
      const wallet = {
        user_id,
        debit_amount: 0,
      };

      const walletExists = await this.walletRepository.get(user_id);
      if (walletExists) return walletExists;

      return this.walletRepository.save(wallet);
    } catch (error) {
      throw error;
    }
  }

  async get(user_id: Iuser["id"]): Promise<Iwallet> {
    try {
      return this.walletRepository.get(user_id);
    } catch (error) {
      throw error;
    }
  }

  async deposit(amount: number, user_email: Iuser["email"]): Promise<boolean> {
    try {
      // TODO: save action in history
      const { id: user_id } = await this.userController.get(user_email);
      const wallet = await this.walletRepository.get(user_id);

      const newAmount = wallet.debit_amount + amount;
      await this.walletRepository.update(newAmount, wallet.id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(amount: number, user_email: Iuser["email"]): Promise<boolean> {
    try {
      const user = new UserController();
      const { id: user_id } = await this.userController.get(user_email);
      const wallet = await this.walletRepository.get(user_id);

      const newAmount = wallet.debit_amount - amount;
      await this.walletRepository.update(newAmount, wallet.id);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
