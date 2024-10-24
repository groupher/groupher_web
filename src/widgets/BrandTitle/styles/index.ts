import type { TTestable } from '~/spec'

// import Img from '~/Img'
import styled, { css, theme } from '~/css'

type TWrapper = TTestable & { mBottom: number }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  margin-bottom: ${({ mBottom }) => `${mBottom}px`};
`
export const Title = styled.div`
  ${css.row()};
  cursor: pointer;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-top: 15px;
`
type TBrandText = { fontSize: number }
export const BrandText = styled.div<TBrandText>`
  color: ${theme('article.title')};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: bold;
  padding: 0 4px;
  border-radius: 3px;
  letter-spacing: 1px;

  background: linear-gradient(to top, #003b49 35%, transparent 35%, transparent 80%);
`
