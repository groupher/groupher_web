import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Input from '@/widgets/Input'
import Button from '@/widgets/Buttons/Button'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn()};
  width: 200px;
  min-width: 200px;
  color: ${theme('article.digest')};
  padding-top: 25px;
`
export const BannerText = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const TabWrapper = styled.div`
  position: relative;
  margin-bottom: 25px;
  margin-left: -8px;
  ${css.flex('align-both')};

  &:before {
    content: '';
    height: 1px;
    width: 170px;
    position: absolute;
    left: 13px;
    bottom: 0;
    background: lightgrey;
    opacity: 0.5;
  }
`

export const SearchInput = styled(Input)`
  width: 180px;
  font-size: 13px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid;
  border-color: ${theme('border')};

  ::placeholder {
    color: ${theme('article.digest')};
    opacity: 0.8;
  }
`
export const NewButton = styled(Button)`
  width: 180px;
  border-radius: 12px;
`
export const PublishButton = styled(Button)`
  width: 180px;
  border-radius: 12px;
  background: ${theme('hoverBg')};
  color: ${theme('article.title')};
  border-color: ${theme('border')};
`
export const BtnText = styled.div`
  margin-left: 4px;
  font-size: 13px;
  margin-top: 2px;
`
