import styled from 'styled-components'

import css, { theme } from '@/css'

import { Wrapper as ParentWrapper } from '.'

export const Wrapper = styled.div`
  box-shadow: ${theme('button.boxShadow')};
  padding: 15px;
  width: 250px;
  height: 415px;
  background: ${theme('htmlBg')};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-bottom: none;
`
export const Item = styled.div`
  margin-bottom: 18px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 3px;
`
export const BarTrack = styled.div`
  height: 5px;
  width: 100%;
  background: #eae9e987; // ${theme('divider')};
  border-radius: 5px;
`
type TBar = { width: string; $good?: boolean; $suck?: boolean }
export const Bar = styled.div<TBar>`
  background: ${({ $good }) => ($good ? theme('rainbow.green') : theme('hint'))};
  border-radius: 6px;
  width: ${({ width }) => width};
  height: 100%;
  opacity: 0.6;

  ${ParentWrapper}:hover & {
    background: ${({ $suck }) => ($suck ? theme('rainbow.red') : '')};
  }

  transition: all 0.1s;
  transition-delay: 0.1s;
`
export const Title = styled.div<{ $good?: boolean }>`
  color: ${({ $good }) => ($good ? theme('rainbow.green') : theme('article.title'))};
  font-weight: ${({ $good }) => ($good ? 500 : 400)};
  font-size: 12px;
`

type TSize = { $good?: boolean; $suck?: boolean }
export const Size = styled.div<TSize>`
  color: ${({ $good }) => ($good ? theme('rainbow.green') : theme('article.digest'))};
  font-weight: ${({ $good }) => ($good ? 500 : 400)};
  font-size: 12px;

  ${ParentWrapper}:hover & {
    color: ${({ $suck }) => ($suck ? theme('rainbow.red') : '')};
    font-weight: ${({ $suck, $good }) => ($suck || $good ? 500 : 400)};
  }

  transition: all 0.1s;
  transition-delay: 0.1s;
`
