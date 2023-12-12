import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  width: 300px;
  min-width: 300px;
  height: auto;
  border-left: 1px solid;
  border-left-color: ${theme('divider')};
  padding-left: 60px;
  padding-top: 10px;
  padding-bottom: 0;
  margin-top: 20px;
  margin-left: 70px;

  ${css.media.mobile`
    display: none;
  `};
`

export const MobileWrapper = styled.div`
  display: none;

  ${css.media.mobile`
    display: block;
    padding: 0 20px;
  `};
`

export const Block = styled.div<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'block')};

  margin-bottom: 20px;
`

export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 500;
  margin-bottom: 10px;
`
export const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${theme('article.digest')};
  line-height: 1.6;
`
