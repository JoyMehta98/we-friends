import { Roles } from "constants/enum";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Roles;
}
