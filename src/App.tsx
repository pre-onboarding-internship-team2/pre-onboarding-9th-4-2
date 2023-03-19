import useData from './hooks/useData';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';

function App() {
  const { isLoading, isError, data, error } = useData();

  if (isLoading) {
    return <h2>Loading...</h2>;
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
              <Th isNumeric>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data!.map((orderList) => (
              <Tr key={orderList.id}>
                <Td>{orderList.id}</Td>
                <Td>{orderList.transaction_time}</Td>
                <Td>{orderList.status}</Td>
                <Td>{orderList.customer_id}</Td>
                <Td>{orderList.customer_name}</Td>
                <Td>{orderList.currency}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>주문 번호</Th>
              <Th>거래시간</Th>
              <Th>주문처리상태</Th>
              <Th>고객번호</Th>
              <Th>고객이름</Th>
              <Th isNumeric>가격</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
