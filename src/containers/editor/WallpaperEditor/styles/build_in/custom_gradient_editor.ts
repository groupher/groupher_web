import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
  margin-top: 25px;
  padding: 20px;

  border: 1px solid;
  border-color: ${theme('article.digest')};
  border-radius: 5px;
  position: relative;
`
export const Label = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  padding: 0 5px;
  background: white;
  font-size: 12px;
`
export const Inputer = styled(Input)`
  width: 100%;
  font-size: 13px;

  ::placeholder {
    font-size: 12px;
  }
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 15px;
`

export const NoteText = styled.div`
  font-size: 11px;
  color: ${theme('hint')};
`

export const Note = styled(Link)`
  font-size: 11px;
  color: ${theme('article.info')};
  text-decoration: none;

  &:hover {
    font-weight: 500;
  }

  transition: all 0.2s;
`
