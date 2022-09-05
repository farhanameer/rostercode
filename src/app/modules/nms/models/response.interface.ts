export interface IResponse {
  status: boolean;
  statusCode: number;
  message: string;
  payload?: Array<any>;
}
