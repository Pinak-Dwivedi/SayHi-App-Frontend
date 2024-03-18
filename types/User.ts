type User =
  | {
      id: string;
      username: string;
      email: string;
      profileImage?: string;
      role?: string;
    }
  | null
  | undefined;

export default User;
