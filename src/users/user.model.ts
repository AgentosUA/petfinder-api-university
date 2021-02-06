export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  pets: [];
  posts: [];
  token: string;
}

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
}