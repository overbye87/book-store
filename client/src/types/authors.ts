export type IAuthor = {
  id: number;
  name: string;
};
export interface IAuthorState {
  authors: IAuthor[];
  loading: boolean;
  selectedAuthors: { id: number | null };
  error: null | string | object;
}
export enum AuthorActionTypes {
  FETCH_AUTHORS = "FETCH_AUTHORS",
  FETCH_AUTHORS_SUCCESS = "FETCH_AUTHORS_SUCCESS",
  FETCH_AUTHORS_ERROR = "FETCH_AUTHORS_ERROR",
  SET_SELECTED_AUTHORS = "SET_SELECTED_AUTHORS",
}

interface IFetchAuthorsAction {
  type: AuthorActionTypes.FETCH_AUTHORS;
}
interface IFetchAuthorsSuccessAction {
  type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS;
  payload: IAuthor[];
}
interface IFetchAuthorsErrorAction {
  type: AuthorActionTypes.FETCH_AUTHORS_ERROR;
  payload: string | object;
}
interface ISetSelectedAuthors {
  type: AuthorActionTypes.SET_SELECTED_AUTHORS;
  payload: number;
}
export type AuthorAction =
  | IFetchAuthorsAction
  | IFetchAuthorsSuccessAction
  | IFetchAuthorsErrorAction
  | ISetSelectedAuthors;
