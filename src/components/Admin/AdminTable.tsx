import { Box, Heading, Table, TableContainer, VStack, Flex } from '@chakra-ui/react';
import { DAY, MONTH, YEAR } from '@utilstableFunc';
import { useMemo } from 'react';

import { IColumns } from '../../common/types';
import AdminTableBody from './AdminTableBody';
import AdminTableHead from './AdminTableHead';
import useData from '@hooks/useData';

function AdminTable() {
  const { tableData } = useData();
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
      <VStack
        bgColor={'white'}
        borderRadius="lg"
        p="5"
        justifyContent={'left'}
        backgroundColor="gray.100"
      >
        <Heading size={'md'} mb="5">
          오늘의 거래건 ({[YEAR, MONTH, DAY].join('-')})
        </Heading>
        <Box overflowY="auto" maxHeight="600px">
          <TableContainer minWidth={'900px'}>
            <Table justifyContent={'center'}>
              <AdminTableHead columns={columns} />
              {tableData.length != 0 ? (
                <AdminTableBody />
              ) : (
                <Flex justifyContent={'center'}>
                  <Heading size="md" m="10">
                    검색 결과가 없습니다.
                  </Heading>
                </Flex>
              )}
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}

export default AdminTable;
