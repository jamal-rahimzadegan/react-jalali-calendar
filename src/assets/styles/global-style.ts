// @ts-nocheck
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: iranyekan;
    font-style: normal;
    font-weight: normal;
    src: url(${'../fonts/iran-yekan-reqular.ttf'}) format('truetype');
    font-display: swap;
  };

  @font-face {
    font-family: iranyekanBold;
    font-style: normal;
    font-weight: bold;
    src: url(${'../fonts/iran-yekan-bold.ttf'}) format('truetype');
    font-display: swap;
  };

  html, body {
    font-family: iranyekan;
  }

`
