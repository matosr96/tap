import { User } from "./user";

export type createUserDto = Omit<User, 'id'>;
export type updateUserDto = Partial<User>;