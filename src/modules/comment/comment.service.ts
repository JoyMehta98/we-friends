import { emitComment, emitNotification } from "socket";
import { CreateCommentDto } from "./comment.dto";
import { CommentFilterPayload, IComment } from "./comment.interfaces";
import Comment from "./comment.model";
import Post from "modules/post/post.model";
import { errorMessages, notificationMessage } from "constants/messages";
import User from "modules/user/user.model";

export const createComment = async (
  payload: CreateCommentDto
): Promise<IComment> => {
  const user = await User.findById(payload.user);
  const post = await Post.findById(payload.post);

  if (!post || !user) {
    throw new Error(errorMessages.notFound);
  }

  const comment = await Comment.create(payload);

  emitComment(comment);
  emitNotification({
    userId: `${post.user}`,
    message: notificationMessage.commented(user.name),
  });

  return comment;
};

export const getFilteredComments = async (
  options: CommentFilterPayload
): Promise<IComment[]> => {
  const { limit, skip, search = "", userId } = options;
  const comments = await Comment.find({
    context: new RegExp(search, "i"),
    ...(userId && { user: userId }),
  })
    .skip(skip)
    .limit(limit);

  return comments;
};

export const getCommentById = async (id: string): Promise<IComment | null> =>
  Comment.findById(id);

export const updateCommentById = async (
  commentId: string,
  updateBody: Partial<CreateCommentDto>
): Promise<IComment | null> =>
  Comment.findByIdAndUpdate(commentId, { $set: updateBody }, { new: true });

export const deleteCommentById = async (commentId: string): Promise<void> => {
  await Comment.deleteOne({ _id: commentId });
};
