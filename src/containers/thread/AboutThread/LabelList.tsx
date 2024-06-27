import type { FC } from 'react'

import type { TSpace } from '~/spec'
import { Trans } from '~/i18n'

import { Wrapper, Label } from './styles/label_list'

type TProps = {
  items: string[]
} & TSpace

const LabelList: FC<TProps> = ({ items, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      {items.map((item: string) => (
        <Label key={item}>{Trans(item)}</Label>
      ))}
    </Wrapper>
  )
}

export default LabelList
