import { Flex, Heading } from '@chakra-ui/react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == '/') {
      navigate('/admin');
    }
  });
  return (
    <>
      <Flex flexDirection={'column'}>
        <Flex flexDirection="column" alignItems={'center'} justifyContent={'center'}>
          <Heading as={Link} to="/" my={3} textColor={'black'}>
            주문 내역 관리 페이지
          </Heading>
          <Heading size={'md'} mb="10">
            2023.03.08
          </Heading>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}

export default Layout;
