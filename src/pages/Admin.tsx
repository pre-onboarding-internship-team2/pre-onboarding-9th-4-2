import { Flex, Skeleton, Stack } from '@chakra-ui/react';

import { LIMIT } from '@common/order';

import useData from '@hooks/useData';

import AdminTable from '@components/Admin/AdminTable';
import Filter from '@components/Filter';
import Paginaton from '@components/Pagination';

function Admin() {
  const { isLoading, isError, error } = useData();

  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <Flex flexDir={'column'} w="800px">
          <Stack>
            {Array(LIMIT)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height="20px" />
              ))}
          </Stack>
        </Flex>
      </Flex>
    );
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <Flex justifyContent={'center'} height="900px">
        <Flex flexDir={'column'}>
          <Filter />
          <AdminTable />
          <Paginaton />
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
