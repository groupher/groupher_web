import styled, { css, theme } from '@/css'
import Input from '@/widgets/Input'
import Button from '@/widgets/Buttons/Button'
import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 42px;
`
export const Inputer = styled(Input)`
  height: 35px;
  font-size: 13px;
`
export const PlusIcon = styled(PlusSVG)<{ disabled: boolean }>`
  ${css.size(11)};
  fill: ${({ disabled }) => (disabled ? theme('article.title') : 'white')};
  margin-right: 6px;
  margin-left: -3px;
`
export const AddButton = styled(Button)`
  border-radius: 5px;
  height: 30px;
  width: 130px;
`
