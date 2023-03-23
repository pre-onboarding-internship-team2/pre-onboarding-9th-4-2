import { useSearchParams } from 'react-router-dom';

import { QueryStringKey } from '@common/order';
import { IData } from '@common/types';

export const YEAR = '2023' as string;
export const MONTH = '03' as string;
export const DAY = '08' as string;

function TableFunc() {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get(QueryStringKey.SORT);
  const order = searchParams.get(QueryStringKey.ORDER);
  const offset = Number(searchParams.get(QueryStringKey.OFFSET));
  const limit = Number(searchParams.get(QueryStringKey.LIMIT));
  const status = searchParams.get(QueryStringKey.STATUS);
  const name = searchParams.get(QueryStringKey.NAME);

  const isToday = (datetime: string) => {
    const [year, month, day] = datetime.split(' ')[0].split('-');
    return YEAR == year && MONTH == month && DAY == day;
  };

  const sortByField = (originData: IData[]) => {
    if (sortField) {
      const sortedData = [...originData].sort((a, b) => {
        return (
          a[sortField as keyof IData]
            .toString()
            .localeCompare(b[sortField as keyof IData].toString(), 'en', {
              numeric: true,
            }) * (order === 'asc' || order == 'default' ? 1 : -1)
        );
      });
      return sortedData;
    }
    return originData;
  };

  const pagination = (originData: IData[]) => {
    if (offset) {
      return originData.slice(offset, offset + limit);
    }
    return originData.slice(0, 50);
  };

  const filterByStatus = (originData: IData[]) => {
    switch (status) {
      case 'true':
        return originData.filter((data) => data.status);
      case 'false':
        return originData.filter((data) => !data.status);
      case 'default':
        return originData;
    }
    return originData;
  };

  const searchByName = (originData: IData[]) => {
    if (name) {
      return originData.filter((data) => data.customer_name.toLocaleLowerCase().includes(name));
    }
    return originData;
  };
  return { isToday, sortByField, pagination, filterByStatus, searchByName };
}

export default TableFunc;
