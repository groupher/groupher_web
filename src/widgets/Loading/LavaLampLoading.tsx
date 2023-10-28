import { FC } from 'react'
import { observer } from 'mobx-react'
import { range, merge } from 'ramda'

import type { TSpace, TSizeTSM } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import SIZE from '@/constant/size'

import { Wrapper, Container, Circle } from './styles/lava_lamp_loading'

type TProps = TSpace & { size?: TSizeTSM }

const LavaLampLoading: FC<TProps> = (props) => {
  const primaryColor = usePrimaryColor()

  const { size } = props
  const _props = merge({ size: size || SIZE.MEDIUM }, props)

  return (
    <Wrapper {..._props}>
      <Container>
        {range(0, 9).map((num) => (
          <Circle key={num} index={num} $color={primaryColor} />
        ))}
      </Container>
    </Wrapper>
  )
}

export default observer(LavaLampLoading)
