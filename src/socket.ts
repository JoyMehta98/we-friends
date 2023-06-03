import { io } from "app";
import { IComment } from "modules/comment/comment.interfaces";

export const emitComment = (payload: IComment) =>
  io.emit("manage-comment", payload);

interface EmitNotificationPayload {
  userId: string;
  message: string;
}

export const emitNotification = (payload: EmitNotificationPayload) =>
  io.emit("notification", payload);

interface EmitLikePayload {
  count: number;
  postId?: string;
  commentId?: string;
}

export const emitLike = (payload: EmitLikePayload) =>
  io.emit("manage-like", payload);
