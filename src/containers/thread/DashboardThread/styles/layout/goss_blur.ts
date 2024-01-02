import styled, { css, theme } from '@/css'
import { BaseSection } from '.'

export const Wrapper = styled.div`
  ${css.column()};
`
export const Section = styled(BaseSection)``

export const ContentWrapper = styled.div`
  ${css.row('align-start')};
  margin-top: 40px;
  margin-bottom: 30px;
`

type TPreviewImage = { effect: string; $darker: boolean }
export const PreviewImage = styled.div<TPreviewImage>`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  background-color: ${theme('hoverBg')};

  width: 300px;
  height: 240px;
  border-radius: 10px;
  ${({ effect }) => effect || ''};
  filter: ${({ $darker }) => `brightness(${$darker ? 0.85 : 1})`};

  transition: all 0.2s;
`
export const PreviewerWrapper = styled.div`
  ${css.column('align-center')};
  
  position: relative;
`
export const ContentBlock = styled.div<{ $bgColor: string }>`
  position: absolute;
  top: -28px;
  left: 20px;
  width: 264px;
  height: 245px;
  background: ${({ $bgColor }) => $bgColor};
  backdrop-filter: blur(50px);

  border: 1px solid;
  border-color: ${theme('divider')};
  z-index: 2;
  border-radius: 8px;
  padding: 20px;

  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;

  transition: all 0.2s;
`
export const Actions = styled.div`
  width: 50%;
  height: 100%;
  flex-grow: 1;
  margin-left: 50px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 450;
  font-size: 16px;
  margin-bottom: 10px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 3px;
`
