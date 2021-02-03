export interface Comment {
  text: string;
  id?: number;
  avatar?: string;
  commentator?: {id: number, avatar: string, full_name: string};
  created?: string;
  full_name?: string;
  comments?: Array<Comment>;
}
