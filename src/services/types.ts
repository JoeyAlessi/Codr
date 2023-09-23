export type User = {
  id: number;
  username: string;
  email: string;
  followers: User[];
  following: User[];
};

export type Post = {
  id: number;
  description: string;
  likes: number;
  dislikes: number;
  comments: string[];
};
