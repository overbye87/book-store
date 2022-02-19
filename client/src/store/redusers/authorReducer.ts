interface IAuthorState {
  authors: any[];
  loading: boolean;
  selectedAuthors: { id: number | null };
  error: null | string | object;
}
enum AuthorActionTypes {
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
  payload: any[];
}
interface IFetchAuthorsErrorAction {
  type: AuthorActionTypes.FETCH_AUTHORS_ERROR;
  payload: string | object;
}
interface ISetSelectedAuthors {
  type: AuthorActionTypes.SET_SELECTED_AUTHORS;
  payload: number;
}
type AuthorAction =
  | IFetchAuthorsAction
  | IFetchAuthorsSuccessAction
  | IFetchAuthorsErrorAction
  | ISetSelectedAuthors;

const initialState: IAuthorState = {
  authors: [
    { id: 1, name: "Robert Louis Balfour Stevenson" },
    { id: 2, name: "Aleksey Nikolaevich Tolstoy" },
    { id: 3, name: "Author 3" },
    { id: 4, name: "Author 4" },
    { id: 5, name: "Author 5" },
  ],
  selectedAuthors: { id: null },
  loading: false,
  error: null,
};

export const authorReducer = (
  state = initialState,
  action: AuthorAction
): IAuthorState => {
  switch (action.type) {
    case AuthorActionTypes.FETCH_AUTHORS:
      return { ...state, loading: true, error: null, authors: [] };
    case AuthorActionTypes.FETCH_AUTHORS_SUCCESS:
      return { ...state, loading: false, error: null, authors: action.payload };
    case AuthorActionTypes.FETCH_AUTHORS_ERROR:
      return { ...state, loading: false, error: action.payload, authors: [] };
    case AuthorActionTypes.SET_SELECTED_AUTHORS:
      return { ...state, selectedAuthors: { id: action.payload } };
    default:
      return state;
  }
};
