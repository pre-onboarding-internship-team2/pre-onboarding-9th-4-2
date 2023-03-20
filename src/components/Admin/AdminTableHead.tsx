import { TableHeadProps } from '../../types/type';
import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { Thead, Th, Tr, Icon } from '@chakra-ui/react';
import { useState } from 'react';

function AdminTableHead({ columns, handleSorting }: TableHeadProps) {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <Thead>
      <Tr>
        {columns.map(({ header, accessor, sortable }) => {
          return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ce42c41 (refactor: 정렬 로직 분리 - useSortableTable custom hook 생성)
            <Th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : undefined}
              style={{ cursor: sortable ? 'pointer' : 'none' }}
            >
<<<<<<< HEAD
=======
            <Th key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : undefined}>
>>>>>>> 7bdadef (feat: 정렬 기능 구현)
=======
>>>>>>> ce42c41 (refactor: 정렬 로직 분리 - useSortableTable custom hook 생성)
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
