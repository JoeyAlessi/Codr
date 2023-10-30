export type User = {
  id: number;
  username: string;
  email: string;
};

export type Post = {
  post_id: number;
  content: string;
  username: string;
  likes: number;
  users_liked: number[];
};

export type Comment = {
  user_id: number;
  username: string;
  post_id: number;
  content: string;
};
