export interface IPost {
  createdAt: string;
  id: number;
  images: string;
  tags: string;
  text: string;
  theme: string;
  title: string;
  updatedAt: string;
  user: IUser;
  userId: number;
  [key: string]: IUser | number | string;
}

export interface IUser {
  id: number;
  login: string;
  avatar?: string;
  createdAt?: string;
  email?: string;
  isAuth?: boolean;
}

export interface ISortOptions {
  value: string;
  name: string;
}

export interface IPostStoreState {
  limit: number;
  posts: IPost[];
  page: number;
  searchQuery: string;
  selectedSort: string;
  sortOptions: ISortOptions[];
  isLoading: boolean;
  error: unknown;
}

export interface IDialogStoreState {
  visible: boolean;
  type: string;
}

export interface IAuthStoreState {
  user: IUser;
  responseMessage: unknown;
  isLoading: boolean;
  error: unknown;
}

export interface IUserStoreState extends IUser {
  news: IPost[];
  isLoading: boolean;
  error: unknown;
}
