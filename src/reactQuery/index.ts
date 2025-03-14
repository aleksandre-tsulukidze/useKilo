import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './enums/queryKey.enum';

import { Zones } from './interfaces';
import { fetchZones } from '../services/services';

const getZonesDataFN = async (): Promise<Zones[] | undefined> => {
  const response = await fetchZones();

  return response?.data;
};

export const useGetDataQuery = () => {
  return useQuery({
    queryFn: () => getZonesDataFN(),
    queryKey: [QueryKey.ZONES],
  });
};
