import { TableHeadProps } from '../../types/type';
import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { Thead, Th, Tr, Icon } from '@chakra-ui/react';
import { useState } from 'react';

function AdminTableHead({ columns, handleSorting }: TableHeadProps) {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'desc' ? 'asc' : order === 'asc' ? 'default' : 'desc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
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
                    sortField === accessor && order === 'asc'
                      ? TriangleUpIcon
                      : sortField === accessor && order === 'desc'
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
