import { User } from "@/domain/entities/User";

export interface UserRepository {
  register(input: RegisterInput): Promise<RegisterResponse>;
  login(input: LoginInput): Promise<LoginResponse>;
}

export interface RegisterInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
