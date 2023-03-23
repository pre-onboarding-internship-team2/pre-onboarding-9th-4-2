import { Badge, Tbody, Td, Tr } from '@chakra-ui/react';

import useData from '@hooks/useData';

function AdminTableBody() {
  const { tableData } = useData();

  return (
    <Tbody aria-label="table-body">
      {tableData.length !== 0 ? (
        tableData.map((data) => {
          return (
            <Tr key={data.id}>
              <Td>{data.id}</Td>
              <Td>{data.transaction_time}</Td>
              <Td>
                {data.status ? (
                  <Badge aria-label="status-true" variant="solid" colorScheme="green">
                    배송완료
                  </Badge>
                ) : (
                  <Badge aria-label="status-false" variant="subtle" colorScheme="green">
                    상품준비중
                  </Badge>
                )}
              </Td>
              <Td>{data.customer_id}</Td>
              <Td>{data.customer_name}</Td>
              <Td>{data.currency}</Td>
            </Tr>
          );
        })
      ) : (
        <Tr>
          <Td fontWeight={'semibold'} fontSize={'2xl'} m="10">
            검색 결과가 없습니다.
          </Td>
        </Tr>
      )}
    </Tbody>
  );
}
export default AdminTableBody;
