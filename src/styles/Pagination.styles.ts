import styled, { css } from 'styled-components/macro';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.WHITE};
  color: ${(props) => props.theme.colors.BLACK};
  border: 1px solid ${(props) => props.theme.colors.GREY_100};
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.GREY};
  }

  &.icon {
    font-size: 1.5rem;
    line-height: 30px;
  }
`;
