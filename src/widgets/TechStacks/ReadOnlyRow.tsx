import { type FC, memo } from 'react'

import type { TCommunity } from '~/spec'
import { Wrapper, ReadOnlyBlock, Logo, Title, NoSetHint } from './styles/row'

type TProps = {
  items: TCommunity[]
  noSet: boolean
}

const ReadOnlyRow: FC<TProps> = ({ items, noSet }) => {
  return (
    <Wrapper>
      {items?.map((t) => (
        <ReadOnlyBlock key={t.slug}>
          <Logo src={t.logo} />
          <Title>{t.title}</Title>
        </ReadOnlyBlock>
      ))}
      {noSet && <NoSetHint>保密</NoSetHint>}
    </Wrapper>
  )
}

export default memo(ReadOnlyRow)
