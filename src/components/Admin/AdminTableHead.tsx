import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { Icon, Th, Thead, Tr } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { OrderKey, OrderType, QueryStringKey } from '@common/order';
import { TableHeadProps } from '@common/types';

function AdminTableHead({ columns }: TableHeadProps) {
  const [params, setParams] = useSearchParams();
  const sortField = params.get(QueryStringKey.SORT);
  const order = params.get(QueryStringKey.ORDER);

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === OrderKey.DEC
        ? OrderKey.ASC
        : order === OrderKey.ASC
        ? OrderKey.DEFAULT
        : (OrderKey.DEC as OrderType);

    params.delete(QueryStringKey.STATUS);
    params.set(QueryStringKey.SORT, accessor);
    params.set(QueryStringKey.ORDER, sortOrder);
    setParams(params);
  };

  return (
    <Thead>
      <Tr>
        {columns.map(({ header, accessor, sortable }) => {
          return (
            <Th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : undefined}
              style={{ cursor: sortable ? 'pointer' : 'none' }}
            >
              {header}
              {sortable ? (
                <Icon
                  as={
                    sortField === accessor && order === OrderKey.ASC
                      ? TriangleUpIcon
                      : sortField === accessor && order === OrderKey.DEC
                      ? TriangleDownIcon
                      : UpDownIcon
                  }
                />
              ) : null}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
}
export default AdminTableHead;
