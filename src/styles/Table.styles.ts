import styled, { css } from 'styled-components/macro';
import { COLORS } from './colors';

type StatusStyle = {
  state?: boolean;
}

export const TableContainer = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Thead = styled.thead`
  font-size: 1.5rem;
  font-weight: bold;
  
  & tr {
    display: table;
    table-layout: fixed;
    width: calc(100% - 1em);
    border-bottom: 1px solid ${COLORS.GREY};
  }

  & th {
    padding: 10px 5px;
  }

  & .icon {
    margin-left: 5px;
    vertical-align: top;
    cursor:pointer;
  }
`;

export const Tbody = styled.tbody`
  font-size: 1.4rem;
  display: block;
  height: calc(100vh - 267px);
  overflow: auto;

  & tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-bottom: 1px solid ${COLORS.GREY};
  }

  & td {
    padding: 10px 5px;
  }
`;

export const Status = styled.span<StatusStyle>`
  display: inline-block;
  width: 60px;
  height: 23px;
  border-radius: 15px;
  line-height: 23px;
  color: ${COLORS.GREEN_100};
  background-color: ${COLORS.GREEN};

  ${(props) => {
    if (!props.state) {
      return css`
        color: ${COLORS.RED_100};
        background-color: ${COLORS.RED};
      `;
    }
  }}
`;