import { createGlobalStyle } from 'styled-components'

import { theme } from '@/css'

const GlobalTableStyle = createGlobalStyle`
  .rs-table-bordered {
    border: none;
  }

  // .rs-table-cell-group-fixed-right
  .rs-table-cell, .rs-table-row-header {
    background: transparent;
  }
  /* .rs-table-cell-group-fixed-left {
    background: transparent;
  } */
  .rs-table-row-header .rs-table-cell {
    background: transparent;
  }

  // .rs-table-hover .rs-table-body-row-wrapper .rs-table-row:hover {
  .rs-table-row:hover {
    background: transparent;
  }

  .rs-table-body-row-wrapper:hover  {
    background: transparent; 
  }
  // only when hover={false} works
  .rs-table-body-row-wrapper .rs-table-row:hover {
    background: ${theme('hoverBg')};
  }
`

export default GlobalTableStyle
