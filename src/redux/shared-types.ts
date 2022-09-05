export enum APIStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type APIError = {
  message: string;
  code: number;
};

export interface ApiStatusState<DataType = null> {
  apiData: DataType | null;
  apiStatus: APIStatus;
  apiError: APIError | null;
}

export const initialApiState: ApiStatusState<null> = {
  apiData: null,
  apiStatus: APIStatus.IDLE,
  apiError: null,
};
