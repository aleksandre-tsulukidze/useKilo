import { Awards, Zones } from '../../reactQuery/interfaces';

export interface FetchDataRequestParams {
  projectId: string;
}

export interface FetchDataResponseData {
  data: Zones[];
}

export interface FetchAwardsResponseData {
  data: Awards[];
  pagination: Pagination;
}

export interface Pagination {
  has_next: boolean;
  has_previous: boolean;
  limit: number;
  next_page: string;
  offset: number;
  page: number;
  previous_page: boolean;
  total_pages: number;
  total_records: number;
}
