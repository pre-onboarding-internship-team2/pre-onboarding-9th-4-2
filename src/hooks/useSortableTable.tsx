import { useState } from 'react';
import { IData } from '../types/type';

type SortableTableProps = [IData[], (accessor: string, sortOrder: string) => void];

function useSortableTable(todayData: IData[]): SortableTableProps {
  const [tableData, setTableData] = useState(todayData);

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...todayData].sort((a, b) => {
        return (
          a[sortField as keyof IData]
            .toString()
            .localeCompare(b[sortField as keyof IData].toString(), 'en', {
              numeric: true,
            }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  return [tableData, handleSorting];
}
export default useSortableTable;
