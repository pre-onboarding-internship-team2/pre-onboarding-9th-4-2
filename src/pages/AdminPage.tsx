import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderTableBoard from "../components/OrderTableBoard";
import Pagination from "../components/Pagination";
import { SEARCH } from "../consts/query.const";
import useFetchData from "../hooks/useFetchData";
import {
  Container,
  Header,
  SearchBar,
  SearchBarButton,
  SearchBarInput,
} from "../styles/common.style";
import { getQueryData } from "../utils/getQueryData";

const AdminPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryData = getQueryData(searchParams);

  const queryStatus = queryData.queryStatus;
  const querySearch = queryData.querySearch;
  const { isLoading, orders, error } = useFetchData({
    queryStatus,
    querySearch,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 20;
  const offset = (currentPage - 1) * ordersPerPage;

  const [searchInput, setSearchInput] = useState("");
  const onClickSearchBtn = () => {
    searchParams.set(SEARCH, `${searchInput}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (queryData.queryPage) setCurrentPage(parseInt(queryData.queryPage));
  }, [searchParams]);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      <Header onClick={() => navigate("/")}>스위치원 | 어드민</Header>

      <SearchBar>
        <SearchBarInput
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchBarButton onClick={onClickSearchBtn}>검색</SearchBarButton>
      </SearchBar>
      <OrderTableBoard
        orders={orders}
        offset={offset}
        ordersPerPage={ordersPerPage}
      />

      <Pagination
        orderListLength={orders.length}
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default AdminPage;