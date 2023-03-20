import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import useData from '@hooks/useData';
import Paginaton from '@components/Pagination';

const LIMIT = 50;

function Admin() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { isLoading, isError, todayData, error } = useData();

  if (isLoading) {
    return (
      <Stack>
        {Array(LIMIT)
          .fill(0)
          .map((_) => (
            <Skeleton height="20px" />
          ))}
      </Stack>
    );
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>주문 내역 관리</TableCaption>
          <Thead>
            <Tr>
              <Th>주문 번호</Th>
              <Th>거래시간</Th>
              <Th>주문처리상태</Th>
              <Th>고객번호</Th>
              <Th>고객이름</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todayData!.slice(offset, offset + LIMIT).map((orderList) => (
              <Tr key={orderList.id}>
                <Td>{orderList.id}</Td>
                <Td>{orderList.transaction_time}</Td>
                <Td>
                  {orderList.status ? (
                    <Badge variant="solid" colorScheme="green">
                      배송완료
                    </Badge>
                  ) : (
                    <Badge variant="subtle" colorScheme="green">
                      상품준비중
                    </Badge>
                  )}
                </Td>
                <Td>{orderList.customer_id}</Td>
                <Td>{orderList.customer_name}</Td>
                <Td>{orderList.currency}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Paginaton total={todayData!.length} limit={LIMIT} page={page} setPage={setPage}></Paginaton>
    </>
  );
}

export default Admin;
