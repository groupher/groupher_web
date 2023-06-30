import { createGlobalStyle } from 'styled-components'

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
`

export default GlobalTableStyle
