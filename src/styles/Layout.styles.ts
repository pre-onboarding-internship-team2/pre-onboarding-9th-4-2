import styled, { css } from 'styled-components/macro';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.GREY};
  & h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const MainContainer = styled.div`
  background-color: ${(props) => props.theme.colors.WHITE};
  border-radius: 15px;
  margin-top: 10px;
  padding: 20px;

  & h2 {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;