import { Box, Radio, RadioGroup, Stack, Heading } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { QueryStringKey, StatusKey } from '@common/order';

function Filter() {
  const [params, setParams] = useSearchParams();

  const initRadioVal = params.get(QueryStringKey.STATUS) || 'all';

  const handleChange = (value: string) => {
    params.set('status', value);
    setParams(params);
  };

  return (
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
  );
}

export default Filter;
