import { api } from '../utils/axios-instance';
import { API_URL } from '../utils/constants';
import {
  FetchAwardsResponseData,
  FetchDataResponseData,
} from './interfaces/fetchData.interface';

export const fetchZones = async (): Promise<
  FetchDataResponseData | undefined
> => {
  const response = await api.get<FetchDataResponseData>(`${API_URL}/zones`, {});

  return response.data;
};

export const fetchAwards = async (
  params: string
): Promise<FetchAwardsResponseData | undefined> => {
  const response = await api.get<FetchAwardsResponseData>(
    `${API_URL}/awards?${params}`,
    {}
  );

  return response.data;
};
