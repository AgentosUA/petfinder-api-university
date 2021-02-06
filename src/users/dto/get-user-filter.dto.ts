import { UserRole } from "../user.model";

export class GetUserFilterDto {
  name: string;
  role: UserRole;
}