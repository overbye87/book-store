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
  parentId: number | null
) => {
  const reqData = {
    bookId,
    userId: userId ? userId : null,
    text,
    parentId: parentId ? parentId : null,
  };
  const response = await $host.post("api/book/comment", reqData);
  const { data } = response;
  return data;
};

// --- DELETE BOOK COMMENT --- --- ---
export const deleteComment = async (id: number) => {
  const reqData = {
    id,
  };
  const response = await $host.delete("api/book/comment", { data: reqData });
  const { data } = response;
  return data;
};
