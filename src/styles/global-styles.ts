// reset or 공통적으로 사용하는 css
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul,ol,li {
        list-style: none
    }
    
    button {
        border: none;
        cursor: pointer;
    }

`

export default GlobalStyle
