import Post from "./post.model";
import { IPost, PostFilterPayload } from "./post.interfaces";
import { CreatePostDto } from "./post.dto";

export const createPost = async (payload: CreatePostDto): Promise<IPost> => {
  return Post.create(payload);
};

export const getFilteredPosts = async (
  options: PostFilterPayload
): Promise<IPost[]> => {
  const { limit, skip, search = "", userId } = options;
  const posts = await Post.find({
    context: new RegExp(search, "i"),
    ...(userId && { user: userId }),
  })
    .skip(skip)
    .limit(limit);

  return posts;
};

export const getPostById = async (id: string): Promise<IPost | null> =>
  Post.findById(id);

export const updatePostById = async (
  postId: string,
  updateBody: Partial<CreatePostDto>
): Promise<IPost | null> =>
  Post.findByIdAndUpdate(postId, { $set: updateBody }, { new: true });

export const deletePostById = async (postId: string): Promise<void> => {
  await Post.deleteOne({ _id: postId });
};
