import { CreateFollowerDto } from "./followers.dto";
import { FollowerFilterPayload, IFollowers } from "./followers.interfaces";
import Followers from "./followers.model";

export const addFollower = async ({
  userId,
  followerId,
}: CreateFollowerDto): Promise<IFollowers> =>
  Followers.create({
    user: userId,
    follower: followerId,
  });

export const getFollowers = async (
  options: FollowerFilterPayload
): Promise<IFollowers[]> => {
  const { limit, skip, userId } = options;
  return Followers.find({
    user: userId,
  })
    .skip(skip)
    .limit(limit)
    .populate("follower")
    .select("name");
};

export const removeFollower = async (
  userId: string,
  followerId: string
): Promise<void> => {
  await Followers.deleteOne({ user: userId, follower: followerId });
};
