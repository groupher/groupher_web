import styled, { css, theme } from '@/css'

import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div``

export const TopWrapper = styled.div`
  ${css.row('justify-between')};
  margin-bottom: 20px;
  padding-bottom: 40px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const BottomWrapper = styled.div`
  margin-top: 25px;
`
export const GroupInputerWrapper = styled.div`
  width: 250px;
`
export const LeftPart = styled.div`
  ${css.column()};
  width: 260px;
  gap: 25px 0;
`
export const RightPart = styled.div`
  width: 220px;
  margin-right: 15px;
`
export const NoteTitle = styled.div`
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: bold;
`
export const NoteP = styled.p`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 12px;
  opacity: 0.8;
`
export const Adder = styled.div`
  ${css.row('align-center')}
  width: 180px;
  margin-left: -5px;
  transform: scale(0.96);
`
export const Slash = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.8;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`

export const LinkGroup = styled.div`
  ${css.rowWrap('justify-start')};
  margin-top: 30px;
  width: calc(100% + 50px);
  gap: 30px;
`
export const ColumnWrapper = styled.div`
  width: 30%;
  height: 100%;
`
export const ItemsWrapper = styled.div`
  ${css.column()};
  gap: 20px 0;
  margin-bottom: 32px;
`
