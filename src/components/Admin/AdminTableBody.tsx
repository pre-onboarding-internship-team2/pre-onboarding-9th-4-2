import { TableBodyProps } from '../../types/type';
import { Tr, Tbody, Td, Badge } from '@chakra-ui/react';

function AdminTableBody({ tableData, offset, limit }: TableBodyProps) {
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
