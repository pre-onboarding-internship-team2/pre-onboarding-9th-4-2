import { Box, Button, Heading, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { QueryStringKey, StatusKey } from '@common/order';

function Filter() {
  const [params, setParams] = useSearchParams();
  const [searchName, setSearchName] = useState('');

  const initRadioVal = params.get(QueryStringKey.STATUS) || 'all';

  const handleRadio = (value: string) => {
    params.set('status', value);
    setParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    params.set('name', searchName.toLocaleLowerCase());
    setParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      params.delete('name');
      setParams(params);
    }
    setSearchName(e.target.value);
  };

  return (
    <Box m="3" mb="5" bg="gray.400" borderRadius={'lg'} p={4} color="black">
      <RadioGroup onChange={handleRadio} value={initRadioVal}>
        <Stack mb="5" direction="row">
          <Heading mr="10" size={'sm'}>
            주문 처리 상태
          </Heading>
          <Radio value={StatusKey.ALL} defaultChecked>
            전체
          </Radio>
          <Radio value={StatusKey.FALSE}>상품준비중</Radio>
          <Radio value={StatusKey.TRUE}>배송완료</Radio>
        </Stack>

        <form onSubmit={handleSearchSubmit}>
          <Stack direction="row" alignContent={'center'}>
            <Heading mr="10" size={'sm'} alignContent={'center'}>
              고객 이름 검색
            </Heading>
            <Input
              value={searchName}
              onChange={handleSearchChange}
              variant="filled"
              placeholder="고객 이름"
              htmlSize={10}
              width="auto"
            />
            <Button type="submit">검색</Button>
          </Stack>
        </form>
      </RadioGroup>
    </Box>
  );
}

export default Filter;
