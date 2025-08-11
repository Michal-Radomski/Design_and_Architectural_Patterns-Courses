// Types and Interfaces

export interface Post {
  id: string;
  title: string;
}

export interface CommentByPostId {
  id: string;
  content: string;
}
