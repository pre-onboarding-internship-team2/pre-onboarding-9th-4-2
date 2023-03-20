import { Table, TableContainer } from '@chakra-ui/react';
import { useMemo } from 'react';

import { IColumns } from '../../common/types';
import AdminTableBody from './AdminTableBody';
import AdminTableHead from './AdminTableHead';

function AdminTable() {
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

  return (
    <>
      <TableContainer>
        <Table>
          <AdminTableHead columns={columns} />
          <AdminTableBody />
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminTable;
