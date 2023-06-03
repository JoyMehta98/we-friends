import { RequestStatus } from "constants/enum";
import { CreateRequestDto, UpdateRequestDto } from "./requests.dto";
import { RequestFilterPayload, IRequests } from "./requests.interfaces";
import { errorMessages, successMessages } from "constants/messages";
import Requests from "./requests.model";
import User from "modules/user/user.model";
import { emitNotification } from "socket";

export const addRequest = async ({
  userId,
  requesterId,
}: CreateRequestDto): Promise<string> => {
  const requester = await User.findById(requesterId).select("name");

  if (!requester) {
    throw new Error(errorMessages.notFound);
  }

  await Requests.create({
    user: userId,
    requester: requesterId,
  });

  emitNotification({
    userId,
    message: successMessages.requestMessage(requester.name),
  });

  return successMessages.requestSent;
};

export const getRequests = async (
  options: RequestFilterPayload
): Promise<IRequests[]> => {
  const { limit, skip, userId } = options;
  return Requests.find({
    user: userId,
  })
    .skip(skip)
    .limit(limit)
    .populate("requester")
    .select("name");
};

export const updateRequest = async (
  payload: UpdateRequestDto
): Promise<void> => {
  const { userId, requesterId, status } = payload;

  const user = await User.findById(userId).select("name");

  if (!user) {
    throw new Error(errorMessages.notFound);
  }

  await Requests.findByIdAndUpdate(
    { user: userId, requester: requesterId },
    { $set: { status } }
  );

  if (status === RequestStatus.ACCEPTED) {
    emitNotification({
      userId: requesterId,
      message: successMessages.requestAccepted(user.name),
    });
  }

  if (status === RequestStatus.REJECTED) {
    emitNotification({
      userId: requesterId,
      message: successMessages.requestRejected(user.name),
    });
  }
};

export const removeRequest = async (
  userId: string,
  requesterId: string
): Promise<void> => {
  await Requests.deleteOne({ user: userId, requester: requesterId });
};
