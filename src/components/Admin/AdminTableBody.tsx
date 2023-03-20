import { Badge, Tbody, Td, Tr } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import useData from '@hooks/useSortableTable';

function AdminTableBody() {
  const { tableData } = useData();
  const [params] = useSearchParams();

  const offset = Number(params.get('offset'));
  const limit = Number(params.get('limit'));

  return (
    <Tbody>
      {tableData.slice(offset, offset + limit).map((data) => {
        return (
          <Tr key={data.id}>
            <Td>{data.id}</Td>
            <Td>{data.transaction_time}</Td>
            <Td>
              {data.status ? (
                <Badge variant="solid" colorScheme="green">
                  배송완료
                </Badge>
              ) : (
                <Badge variant="subtle" colorScheme="green">
                  상품준비중
                </Badge>
              )}
            </Td>
            <Td>{data.customer_id}</Td>
            <Td>{data.customer_name}</Td>
            <Td>{data.currency}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}
export default AdminTableBody;
