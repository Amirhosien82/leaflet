import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
@font-face {
    font-family: Sinera;
    src: url("./fonts/Sinera.woff");
}
*{
    font-family: Sinera;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
a{
    text-decoration: none;
}
`;

export default GlobalStyled;
