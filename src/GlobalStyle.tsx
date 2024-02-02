import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
      padding: 0;
      margin: 0;
      border: 0;
      font-family: 'Roboto', sans-serif;
      font-weight: 300; 
      font-size: 16px; 
  }
  body{
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }

  :root {
    --white: hsl(0,0%,100%);
    --dark-gray: hsl(0,0,64%);
    --black: hsl(0,0,14%);
    --skyblue: rgba(0, 123, 213, 1);
    --background : rgba(251, 251, 251, 1);
    --whiteblue: rgba(215, 236, 252, 1);
    --line-gray: rgba(91, 91, 91, 0.17);
    --light-gray: rgba(155, 155, 161, 1);



   --header-size: 24px;
   --normal-size: 16px;
   --small-size: 12px;
    
  }

`;

export default GlobalStyles;
