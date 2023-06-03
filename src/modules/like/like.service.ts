import Post from "modules/post/post.model";
import { Likes } from "constants/enum";
import Comment from "modules/comment/comment.model";
import { emitLike, emitNotification } from "socket";
import { ManageLikeDto } from "./like.dto";
import Like from "./like.model";
import { notificationMessage } from "constants/messages";
import User from "modules/user/user.model";

interface NotificationPayload {
  userId: string;
  name: string;
  key: string;
}

const sendNotification = ({ name, userId, key }: NotificationPayload) => {
  if (key === "comment") {
    emitNotification({
      userId,
      message: notificationMessage.likedComment(name),
    });
  } else {
    emitNotification({ userId, message: notificationMessage.likedPost(name) });
  }
};

export const manageLike = async (payload: ManageLikeDto) => {
  const { postId, type, userId, commentId } = payload;

  const user = await User.findById(userId);

  if (!user) {
    return;
  }

  let query;
  let receiverId;

  if (commentId) {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return;
    }

    query = { comment: commentId };
    receiverId = comment.user;
  } else {
    const post = await Post.findById(postId);

    if (!post) {
      return;
    }

    query = { post: postId };
    receiverId = post.user;
  }

  let likesCount = await Like.count(query);

  if (type === Likes.Add) {
    await Like.create({ ...query, user: userId });
    likesCount += 1;
    sendNotification({
      userId: `${receiverId}`,
      key: Object.keys(query || {})[0],
      name: user.name,
    });
  } else {
    await Like.deleteOne({ ...query, user: userId });
    likesCount -= 1;
  }

  emitLike({ ...query, count: likesCount });
};
