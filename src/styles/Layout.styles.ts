import styled from 'styled-components/macro';
import { COLORS } from './colors';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: ${COLORS.GREY};
  & h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const MainContainer = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 15px;
  margin-top: 10px;
  padding: 20px;

  & h2 {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;