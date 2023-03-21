import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { QueryStringKey, StatusKey } from '@common/order';

function Filter() {
  const [params, setParams] = useSearchParams();
  const [searchName, setSearchName] = useState('');

  const initRadioVal = params.get(QueryStringKey.STATUS) || 'all';

  const handleRadio = (value: string) => {
    params.set(QueryStringKey.STATUS, value);
    setParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    params.set(QueryStringKey.NAME, searchName.toLocaleLowerCase());
    setParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      params.delete(QueryStringKey.NAME);
      setParams(params);
    }
    setSearchName(e.target.value);
  };

  return (
    <VStack mb="5" bg="gray.400" borderRadius={'lg'} p={4}>
      <Box
        display="flex"
        flexDir={'row'}
        width="full"
        alignItems="center"
        justifyContent={'space-between'}
      >
        <RadioGroup onChange={handleRadio} value={initRadioVal}>
          <HStack>
            <Heading mr="5" size={'sm'}>
              주문 처리 상태
            </Heading>
            <Radio value={StatusKey.ALL} defaultChecked>
              전체
            </Radio>
            <Radio value={StatusKey.FALSE}>상품준비중</Radio>
            <Radio value={StatusKey.TRUE}>배송완료</Radio>
          </HStack>
        </RadioGroup>
        <Divider orientation="vertical" />

        <form onSubmit={handleSearchSubmit}>
          <HStack>
            <Heading mr="5" size={'sm'} alignContent={'center'}>
              고객 이름 검색
            </Heading>
            <Input
              value={searchName}
              onChange={handleSearchChange}
              variant="filled"
              placeholder="고객 이름을 검색하세요."
              htmlSize={20}
              width="auto"
            />
            <Button type="submit">검색</Button>
          </HStack>
        </form>
      </Box>
    </VStack>
  );
}

export default Filter;
