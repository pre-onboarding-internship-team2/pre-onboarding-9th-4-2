import styled, { css } from 'styled-components/macro';

type StatusStyle = {
  color: string;
  bgColor: string;
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

export const Status = styled.span<StatusStyle>`
  display: inline-block;
  width: 60px;
  height: 23px;
  border-radius: 15px;
  line-height: 23px;

  ${({ color = 'BLACK', bgColor = 'GREY' }) => css`
    color: ${(props) => props.theme.colors[color]};
    background-color: ${(props) => props.theme.colors[bgColor]};
  `}
`;