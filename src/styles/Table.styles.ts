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
    border-bottom: 1px solid ${COLORS.GREY};
  }

  & th {
    padding: 10px 5px;
  }
`;

export const Tbody = styled.tbody`
  font-size: 1.4rem;
  & tr {
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