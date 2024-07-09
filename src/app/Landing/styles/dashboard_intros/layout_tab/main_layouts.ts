import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  margin-top: 30px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.7;
`
export const Layouts = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 15px 20px;
  margin-bottom: 12px;
`
export const Card = styled.div`
  position: relative;
  width: 108px;
  height: 120px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${theme('divider')};
  box-shadow: ${theme('button.boxShadow')};
`
