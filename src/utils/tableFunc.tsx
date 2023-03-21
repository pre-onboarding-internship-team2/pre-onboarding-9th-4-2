import { useSearchParams } from 'react-router-dom';
import { IData } from '@common/types';

const YEAR = '2023';
const MONTH = '03';
const DAY = '08';

function TableFunc() {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');
  const offset = Number(searchParams.get('offset'));
  const limit = Number(searchParams.get('limit'));
  const status = searchParams.get('status');

  const isToday = (datetime: string) => {
    const [year, month, day] = datetime.split(' ')[0].split('-');
    if (YEAR == year && MONTH == month && DAY == day) {
      return true;
    }
    return false;
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
    return originData.slice(offset, offset + limit);
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
  return { isToday, sortByField, pagination, filterByStatus };
}

export default TableFunc;
