import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  // this is for disable pop animation
  // should have no animation when navi to sub menu
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: translateY(0);
  }

`

export default GlobalStyle
