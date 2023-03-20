import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { Icon, Th, Thead, Tr } from '@chakra-ui/react';
import { TableHeadProps } from 'common/types';
import { useSearchParams } from 'react-router-dom';

function AdminTableHead({ columns }: TableHeadProps) {
  const [params, setParams] = useSearchParams();
  const sortField = params.get('sort');
  const order = params.get('order');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'desc' ? 'asc' : order === 'asc' ? 'default' : 'desc';

    params.set('sort', accessor);
    params.set('order', sortOrder);
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
