import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  margin-left: 15px;

  ${css.media.mobile`
    margin-left: 12px;
  `};
`
export const CountHint = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
  margin-left: 18px;
  margin-top: 10px;
  opacity: 0.8;
`
export const SlashSign = styled.div`
  font-size: 11px;
  font-weight: bolder;
  font-family: monospace;
  opacity: 0.8;
  margin-right: 8px;
`
export const CountNum = styled.div`
  color: ${theme('article.info')};
  font-weight: bold;
  margin-right: 5px;
`

export const ListWrapper = styled.div`
  margin-left: 17.5px;
  padding-left: 4px;
`
