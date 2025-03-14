export interface FetchDataParams {
  params: URLSearchParams;
}

export type Zones = Record<number, ZonesTidy>;

export interface ZonesTidy {
  zone_id: number;
  name: string;
}

export type Awards = Record<number, AwardsTidy>;

export interface AwardsTidy {
  application_id: number;
  award_id: number;
  entry: string;
  pref: number;
  size: number;
  zone_id: number;
}
