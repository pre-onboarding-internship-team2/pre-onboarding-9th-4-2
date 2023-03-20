import { createGlobalStyle, css } from 'styled-components/macro';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  };

  * {
    box-sizing: border-box;
  };

  html, body {
    font-size: 62.5%;
    font-family: 'Pretendard-Regular', sans-serif;
  };
`;

export default GlobalStyle;
