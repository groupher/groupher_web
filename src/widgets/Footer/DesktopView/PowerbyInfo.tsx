import { FC } from 'react'
import { isEmpty } from 'ramda'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { LineDivider } from '@/widgets/Common'

import { BEIAN_ADDR, BEIAN_TEXT } from '@/config'
import { Wrapper, Note, Addr, BottomWrapper } from '../styles/desktop_view/powerby_info'

type TProps = {
  metric?: TMetric
}

const PowerbyInfo: FC<TProps> = ({ metric }) => {
  return (
    <Wrapper testid="power-by">
      {metric !== METRIC.HOME && (
        <Note>
          由<Addr href="/">Groupher</Addr>
          提供服务
        </Note>
      )}

      <BottomWrapper>
        {!isEmpty(BEIAN_TEXT) && (
          <Note>
            <Addr href={BEIAN_ADDR} target="_blank" prefetch={false}>
              {BEIAN_TEXT}
            </Addr>
          </Note>
        )}
        <LineDivider height={10} left={5} right={6} />
        <Note>违法信息举报</Note>
      </BottomWrapper>
    </Wrapper>
  )
}

export default PowerbyInfo
