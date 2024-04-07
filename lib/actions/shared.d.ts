import { User } from '@/database/models/user.model';

export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  profilePic: string;
}

export type UpdateUserParams = {
  clerkId: string;
  updateData: Partial<User>;
  path: string; // For page revalidate purposes
}

export type DeleteUserParams = {
  clerkId: string;
}