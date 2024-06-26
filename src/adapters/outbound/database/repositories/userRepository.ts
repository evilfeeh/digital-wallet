import { IUserRepository } from "../../../../application/ports/outbound/IUserRepository";
import { DataSource } from "typeorm";
import { Users } from "../entities/user";
import datasource from "../ormconfig";

export class UserRepository implements IUserRepository {
  AppDataSource: DataSource = datasource;
  async get(email: Users["email"]): Promise<Users> {
    try {
      return this.AppDataSource.getRepository(Users)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<Users[]> {
    try {
      return this.AppDataSource.getRepository(Users)
        .createQueryBuilder("user")
        .getMany();
    } catch (error) {
      throw error;
    }
  }
  async save(user: Users): Promise<Users> {
    try {
      const insertedUsers = await this.AppDataSource.createQueryBuilder()
        .insert()
        .into(Users)
        .values(user)
        .execute();
      return insertedUsers.raw;
    } catch (error) {
      throw error;
    }
  }
  async update(email: Users["email"], toUpdate: any): Promise<boolean> {
    try {
      const { affected } = await this.AppDataSource.createQueryBuilder()
        .update(Users)
        .set(toUpdate)
        .where("email = :email", { email })
        .execute();
      return affected ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async delete(email: Users["email"]): Promise<boolean> {
    try {
      const { affected } = await this.AppDataSource.getRepository(Users)
        .createQueryBuilder("user")
        .update(Users)
        .set({ active: false })
        .where("email = :email", { email })
        .execute();
      return affected ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
