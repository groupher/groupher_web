import Link from 'next/link'
import styled from 'styled-components'

import css, { theme } from '@/css'

import FeedbackSVG from '@/icons/menu/Feedback'
import GithubSVG from '@/icons/Github8'

import { Wip } from './index'

export const Wrapper = styled.div`
  ${css.column('align-start')};
  width: 100%;
  min-height: 80px;
  background: #023a48;
  padding: 22px 20px;
  padding-bottom: 2px;
`
export const Entry = styled.div`
  ${css.row('align-center')};
  width: 100%;
  margin-bottom: 15px;
`
export const Main = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
`
const baseIcon = `
  ${css.size(18)};
  margin-top: -2px;

  ${Main}:hover & {
    fill: ${theme('button.primary')};
    cursor: pointer;
  }
`

const Feedback = styled(FeedbackSVG)`
  ${baseIcon};
  fill: ${theme('article.title')};
`
const Github = styled(GithubSVG)`
  ${baseIcon};
  ${css.size(16)};
  margin-left: 2px;
  fill: ${theme('article.title')};
`
export const Icon = {
  Feedback,
  Github,
}

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: bold;
  margin-left: 12px;

  ${Main}:hover & {
    color: #2d7eb1;
    text-decoration: underline;
    text-decoration-color: #2d7eb1;
    cursor: pointer;
  }
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: 10px;
  align-self: flex-end;
`
export const Notice = styled(Wip)`
  background-color: #145b73;
  color: #90b5b7;
  padding: 1px 6px;
  border-radius: 7px;
  border: none;
  margin-top: 2px;
`
