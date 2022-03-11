import { $host } from "./index";
import jwt_decode from "jwt-decode";

// --- UPDATE BOOK RATING --- --- ---
export const updateBookRating = async (
  bookId: number,
  userId: number,
  rate: number | null
) => {
  const reqData = new FormData();
  reqData.append("bookId", `${bookId}`);
  reqData.append("userId", `${userId}`);
  reqData.append("rate", `${rate}`);
  const response = await $host.post("api/book/rating", reqData);
  const { data } = response;
  return data;
};

// --- GET ONE BOOK --- --- ---
export const fetchOneBook = async (id: string) => {
  const response = await $host.get("api/book/" + id);
  return response.data;
};

// --- CREATE BOOK COMMENT --- --- ---
export const createComment = async (
  bookId: number,
  userId: number | null,
  text: string,
  answerId: number | null
) => {
  const reqData = new FormData();
  reqData.append("bookId", `${bookId}`);
  reqData.append("userId", userId ? `${userId}` : "");
  reqData.append("text", `${text}`);
  reqData.append("answerId", answerId ? `${answerId}` : "");
  const response = await $host.post("api/book/comment", reqData);
  const { data } = response;
  return data;
};

// --- DELETE BOOK COMMENT --- --- ---
export const deleteComment = async (id: number) => {
  const reqData = new FormData();
  reqData.append("id", `${id}`);
  const response = await $host.delete("api/book/comment", { data: reqData });
  const { data } = response;
  return data;
};
