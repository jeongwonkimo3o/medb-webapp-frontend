interface UpdateUserInfoParams {
  currentPassword?: string;
  newPassword?: string;
  newNickname?: string;
}

interface UpdateUserInfoResponse {
  message: string;
}