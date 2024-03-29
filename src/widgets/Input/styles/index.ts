import type { TTestable, TActive } from '@/spec'
import Img from '@/Img'
import styled, { css, theme } from '@/css'

type IInput = {
  $hasPrefix: boolean
  $hasSuffix: boolean
  spellCheck: string
}

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  position: relative;
  width: 100%;
`
const AddOn = styled.div<TActive>`
  position: absolute;
  top: 0;
  ${css.row('align-both')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  width: 30px;
  height: 32px;
  z-index: 1;
`
export const PrefixWrapper = styled(AddOn)`
  left: 0;
`
export const SuffixWrapper = styled(AddOn)`
  right: 0;
`
export const Icon = styled(Img)<TActive>`
  fill: ${({ active }) => (active ? theme('button.primary') : theme('article.digest'))};
  ${css.size(14)};
  opacity: 0.8;

  ${Wrapper}:hover & {
    opacity: 1;
  }
  transition: opacity 0.25s;
`
export const baseInput = `
  outline: none; 
  font-variant: tabular-nums;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  
  background-image: none;
  border: 1px solid;
  transition: all 0.2s;
  -webkit-appearance: none; 
`
export const InputWrapper = styled.input<IInput>`
  ${baseInput};
  padding: 4px 11px;
  height: 34px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  color: ${theme('article.title')};
  padding-left: ${({ $hasPrefix }) => ($hasPrefix ? '26px' : '8px')};
  padding-right: ${({ $hasSuffix }) => ($hasSuffix ? '26px' : '8px')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  border-radius: 4px;
  background-color: ${theme('form.inputBg')};
  caret-color: ${theme('article.title')};

  ::placeholder {
    color: ${theme('article.digest')};
    opacity: 0.5;
  }
  &:hover {
    border-color: ${theme('editor.borderActive')};
  }
  &:focus {
    border-color: ${theme('editor.borderActive')};
    background-color: ${theme('alphaBg2')};
    /* box-shadow: -2px 1px 0px 0px rgba(0, 0, 0, 0.2); */
  }
  &:active {
    border-color: ${theme('editor.borderActive')};
    background-color: ${theme('alphaBg2')};
    /* box-shadow: -2px 1px 0px 0px rgba(0, 0, 0, 0.2); */
  }
`
