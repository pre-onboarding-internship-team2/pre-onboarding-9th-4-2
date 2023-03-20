import styled, { css } from 'styled-components/macro';

export const TableContainer = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Thead = styled.thead`
  font-size: 1.5rem;
  font-weight: bold;
  & tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.GREY};
  }

  & th {
    padding: 10px 5px;
  }
`;

export const Tbody = styled.tbody`
  font-size: 1.4rem;
  & tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.GREY};
  }

  & td {
    padding: 10px 5px;
  }
`;