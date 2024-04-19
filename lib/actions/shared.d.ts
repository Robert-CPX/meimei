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

export type CreateFeedbackParams = {
  author: string;
  detail: string;
  rating?: number;
  type?: string;
}

export type GetUserByIdParams = {
  userId: string;
}

export type HaveConversationParams = {
  content: string;
  userId: string;
}

export type SetTimerParams = {
  userId: string;
  time: number;
}

export type SetModeParams = {
  userId: string;
  mode: string;
}