import { IUser } from "./users";

export interface INotification {
  id: number;
  bookId: number;
  read: boolean;

  parentCommentId: number;
  parentUserId: number;

  replyCommentId: number;
  replyUserId: number;

  parentUser: IUser;
  replyUser: IUser;
}

export interface IMessageRemove {
  status: boolean;
  id: number;
}
