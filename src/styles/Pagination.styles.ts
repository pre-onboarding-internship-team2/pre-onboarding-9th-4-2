import styled from 'styled-components/macro';
import { COLORS } from './colors';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${COLORS.WHITE};
  color: ${COLORS.BLACK};
  border: 1px solid ${COLORS.GREY_100};
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: ${COLORS.GREY};
  }

  &.arrowBtn {
    font-size: 1.5rem;
    line-height: 30px;
  }

  &[disabled] {
    cursor: default;
    background-color: ${COLORS.GREY};

    & > .icon polyline {
      stroke: ${COLORS.GREY_100};
    }
  }

  &[aria-current] {
    border: 1px solid ${COLORS.ORANGE};
    color: ${COLORS.WHITE};
    background-color: ${COLORS.ORANGE};

    &:hover {
      background-color: ${COLORS.ORANGE};
    }
  }
`;
