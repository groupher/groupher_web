import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.flex('justify-between')};
`
export const LeftPart = styled.div`
  ${css.flexColumn()};
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
  font-size: 12px;
  font-weight: bold;
`
export const NoteP = styled.p`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-bottom: 12px;
  opacity: 0.8;
`
export const Adder = styled.div`
  width: 120px;
  margin-left: -5px;
  transform: scale(0.95);
  opacity: 0.8;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.25s;
`

export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`
