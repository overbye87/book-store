import { $host } from "./index";

// --- GET COMMENTS BY BOOK ID --- --- ---
export const fetchCommentsByBookId = async (id: string) => {
  const response = await $host.get("api/book/comment/" + id);
  return response.data;
};

// --- CREATE BOOK COMMENT --- --- ---
export const createComment = async (
  bookId: number,
  userId: number | null,
  text: string,
  parrentId: number | null
) => {
  const reqData = new FormData();
  reqData.append("bookId", `${bookId}`);
  reqData.append("userId", userId ? `${userId}` : "");
  reqData.append("text", `${text}`);
  reqData.append("parrentId", parrentId ? `${parrentId}` : "");
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
