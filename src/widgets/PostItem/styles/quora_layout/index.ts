import styled, { css } from '~/css'

export default () => {
  return {
    wrapper: 'row relative',
  }
}

export const Main = styled.div`
  ${css.columnGrow()};
`
