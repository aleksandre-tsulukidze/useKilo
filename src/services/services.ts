import { api } from '../utils/axios-instance';
import { API_URL } from '../utils/constants';
import {
  FetchDataRequestParams,
  FetchDataResponseData,
} from './interfaces/fetchData.interface';

export const FetchData = async (
  params: FetchDataRequestParams
): Promise<FetchDataResponseData | undefined> => {
  const { projectId } = params;

  const response = await api.get<FetchDataResponseData>(
    `${API_URL}/v1/project/${projectId}/data?`,
    {}
  );

  return response.data;
};
