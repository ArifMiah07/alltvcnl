export interface Channel {
  id?: string | number;
  name?: string;
  title?: string;
  tittle?: string;
  url?: string;
  streamUrl?: string;
  logo?: string;
  image?: string;
  category?: string;
  group?: string;
  country?: string;
  status?: boolean;
  [key: string]: unknown;
}

export interface PageResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
}

export interface SearchResult<T> extends PageResult<T> {
  currentIndexSet?: number;
}

export interface Playlist {
  id: string;
  name: string;
  channels: Channel[];
  createdAt: number;
  updatedAt: number;
}
