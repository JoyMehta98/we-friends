import { RequestStatus } from "constants/enum";

export interface CreateRequestDto {
  userId: string;
  requesterId: string;
}

export interface UpdateRequestDto extends CreateRequestDto {
  status: RequestStatus;
}
