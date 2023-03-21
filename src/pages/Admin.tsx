import { Stack, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import useData from '@hooks/useData';
import AdminTable from '@components/Admin/AdminTable';
import Paginaton from '@components/Pagination';

const LIMIT = 50;

function Admin() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, todayData, error } = useData();

  if (isLoading) {
    return (
      <Stack>
        {Array(LIMIT)
          .fill(0)
          .map((_) => (
            <Skeleton height="20px" />
          ))}
      </Stack>
    );
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <AdminTable todayData={todayData} page={page} limit={LIMIT} />
      <Paginaton total={todayData!.length} limit={LIMIT} page={page} setPage={setPage}></Paginaton>
    </>
  );
}

export default Admin;
