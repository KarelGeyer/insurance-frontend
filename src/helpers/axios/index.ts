export interface BaseRes<T> {
  data: T;
  status: number;
  responseMessage: string;
}
