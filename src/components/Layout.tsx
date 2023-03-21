import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

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
      <Flex flexDirection={'column'} bgColor="gray.300">
        <Flex flexDirection="column" alignItems={'center'} justifyContent={'center'}>
          <Heading as={Link} to="/" my={8} textColor={'black'}>
            주문 내역 관리
          </Heading>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}

export default Layout;
