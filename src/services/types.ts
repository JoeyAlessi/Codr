export type User = {
  id: number;
  username: string;
  email: string;
  followers: User[];
  following: User[];
};
