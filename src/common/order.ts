export const LIMIT = 50;

export type OrderType = 'asc' | 'dec' | 'default';
export type StatusType = 'all' | 'true' | 'false';

export const OrderKey = {
  ASC: 'asc',
  DEC: 'dec',
  DEFAULT: 'default',
};

export const StatusKey = {
  ALL: 'all',
  TRUE: 'true',
  FALSE: 'false',
};

export const QueryStringKey = {
  SORT: 'sort',
  ORDER: 'order',
  OFFSET: 'offset',
  LIMIT: 'limit',
  STATUS: 'status',
};
