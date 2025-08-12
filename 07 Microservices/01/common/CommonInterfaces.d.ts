// Types and Interfaces

export interface Post {
  id: string;
  title: string;
  comments?: CommentByPostId[];
}

export interface CommentByPostId {
  id: string;
  content: string;
  status: string;
}
