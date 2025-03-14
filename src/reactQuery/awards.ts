import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './enums/queryKey.enum';

import { AwardsTidy, FetchDataParams } from './interfaces';
import { fetchAwards } from '../services/services';
import { Pagination } from '../services/interfaces/fetchData.interface';

const getAwardsData = async (
  params: URLSearchParams
): Promise<{ data: AwardsTidy[]; pagination: Pagination } | undefined> => {
  const response = await fetchAwards(params.toString());
  const dataTidy = response?.data.map((award) => Object.values(award)[0]);
  const filteredData = dataTidy?.filter((award) => award !== undefined);
  const pagination = response?.pagination;

  if (!filteredData || !pagination) {
    return undefined;
  }

  return { data: filteredData, pagination };
};

export const useGetAwardsQuery = (params: FetchDataParams) => {
  return useQuery({
    queryFn: () => getAwardsData(params.params),
    queryKey: [QueryKey.AWARDS, params.params.toString()],
  });
};
