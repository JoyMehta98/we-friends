export const errorMessages = {
  userAlreadyExists: "User already exists",
  invalidCredentials: "Invalid credentials",
  unauthorized: "Unauthorized",
  notFound: "Record not found",
};

export const successMessages = {
  requestSent: "Friend request sent successfully",
  requestAccepted: (name: string) => `${name} accepted your friend request`,
  requestRejected: (name: string) => `${name} rejected your friend request`,
  requestDeleted: "Friend request deleted successfully",
  requestMessage: (name: string) => `You have a friend request of ${name}`,
};

export const notificationMessage = {
  likedPost: (name: string) => `${name} has liked your post`,
  likedComment: (name: string) => `${name} has liked your comment`,
  commented: (name: string) => `${name} has commented on your post`,
};
