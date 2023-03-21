import { Flex, Box, Radio, RadioGroup, Skeleton, Stack, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LIMIT, QueryStringKey, StatusKey } from '@common/order';

import useData from '@hooks/useData';

import AdminTable from '@components/Admin/AdminTable';
import Paginaton from '@components/Pagination';

function Admin() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();

  const initRadioVal = params.get(QueryStringKey.STATUS) || 'all';

  const { isLoading, isError, error } = useData();

  if (isLoading) {
    return (
      <Stack>
        {Array(LIMIT)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height="20px" />
          ))}
      </Stack>
    );
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  const handleChange = (value: string) => {
    params.set('status', value);
    setParams(params);
  };

  return (
    <>
      <Flex justifyContent={'center'}>
        <Flex flexDir={'column'} w="800px">
          <Box m="3" mb="5" bg="gray.400" borderRadius={'lg'} p={4} color="black">
            <RadioGroup onChange={handleChange} value={initRadioVal}>
              <Stack direction="row">
                <Heading mr="10" size={'sm'}>
                  주문 처리 상태
                </Heading>
                <Radio value={StatusKey.ALL} defaultChecked>
                  전체
                </Radio>
                <Radio value={StatusKey.FALSE}>상품준비중</Radio>
                <Radio value={StatusKey.TRUE}>배송완료</Radio>
              </Stack>
            </RadioGroup>{' '}
          </Box>
          <AdminTable />
          <Paginaton page={page} setPage={setPage}></Paginaton>
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
