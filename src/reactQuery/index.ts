import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './enums/queryKey.enum';
import { FetchData } from '../services/services';
import { FetchDataParams } from './interfaces';

const getDataFN = async (
  onlyCreatedFromAdmin: boolean
): Promise<any[] | undefined> => {
  const projectId = '';

  if (!projectId) return;

  const response = await FetchData({ projectId });
  return response?.data;
};

export const useGetDataQuery = (params: FetchDataParams) => {
  return useQuery({
    queryFn: () => getDataFN(params.params),
    queryKey: [QueryKey.DATA, params.params],
  });
};
