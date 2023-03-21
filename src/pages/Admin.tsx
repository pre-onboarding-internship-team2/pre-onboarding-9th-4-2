import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LIMIT } from '@common/order';

import useData from '@hooks/useData';

import AdminTable from '@components/Admin/AdminTable';
import Paginaton from '@components/Pagination';
import Filter from '@components/Filter';

function Admin() {
  const [page, setPage] = useState(1);

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
      <Flex justifyContent={'center'}>
        <Flex flexDir={'column'} w="800px">
          <Filter />
          <AdminTable />
          <Paginaton page={page} setPage={setPage}></Paginaton>
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
