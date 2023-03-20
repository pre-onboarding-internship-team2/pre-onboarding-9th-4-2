import { TableProps, IColumns, IData } from '../../types/type';
import AdminTableBody from './AdminTableBody';
import AdminTableHead from './AdminTableHead';
import { Table, TableContainer } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

function AdminTable({ todayData, page, limit }: TableProps) {
  const [tableData, setTableData] = useState(todayData);
  const offset = (page - 1) * limit;

  const columns = useMemo<IColumns[]>(
    () => [
      {
        header: '주문 번호',
        accessor: 'id',
        sortable: true,
      },
      {
        header: '거래일 & 거래 시간',
        accessor: 'transaction_time',
        sortable: true,
      },
      {
        header: '주문처리상태',
        accessor: 'status',
        sortable: false,
      },
      {
        header: '고객번호',
        accessor: 'customer_id',
        sortable: false,
      },
      {
        header: '고객이름',
        accessor: 'customer_name',
        sortable: false,
      },
      {
        header: '가격',
        accessor: 'currency',
        sortable: false,
      },
    ],
    []
  );

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

  return (
    <>
      <TableContainer>
        <Table>
          <AdminTableHead columns={columns} handleSorting={handleSorting} />
          <AdminTableBody tableData={tableData} offset={offset} limit={limit} />
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminTable;
