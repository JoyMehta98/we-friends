import { Likes } from "constants/enum";

export interface ManageLikeDto {
  userId: string;
  postId?: string;
  type: Likes;
  commentId?: string;
}
