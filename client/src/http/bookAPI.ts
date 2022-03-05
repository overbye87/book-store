import { $host } from "./index";
import jwt_decode from "jwt-decode";

// --- UPDATE BOOK RATING --- --- ---
export const updateBookRating = async (
  bookId: number,
  userId: number,
  rate: number | null
) => {
  const reqData = new FormData();
  reqData.append("userId", `${bookId}`);
  reqData.append("userId", `${userId}`);
  reqData.append("rate", `${rate}`);
  const response = await $host.put("api/user/update", reqData);
  localStorage.setItem("accessToken", response.data.token);
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};
