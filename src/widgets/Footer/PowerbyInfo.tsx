import { isEmpty } from 'ramda'

import METRIC from '~/const/metric'
import useMetric from '~/hooks/useMetric'
import { LineDivider, DesktopOnly, MobileOnly, Row, Br } from '~/widgets/Common'

import { BEIAN_ADDR, BEIAN_TEXT } from '~/config'

import { Wrapper, Note, Addr, BottomWrapper } from './styles/powerby_info'

export default () => {
  const metric = useMetric()

  return (
    <Wrapper $testid="power-by">
      {metric !== METRIC.HOME && (
        <Note>
          由<Addr href="/">Groupher</Addr>
          提供服务
        </Note>
      )}

      <DesktopOnly>
        <BottomWrapper>
          {metric === METRIC.HOME && <Note>Made in ChengDu</Note>}
          {metric === METRIC.HOME && <LineDivider height={10} left={8} right={6} />}
          {!isEmpty(BEIAN_TEXT) && (
            <Note>
              <Addr href={BEIAN_ADDR} target="_blank" prefetch={false}>
                {BEIAN_TEXT}
              </Addr>
            </Note>
          )}
          {/* <LineDivider height={10} left={5} right={6} /> */}
          <Note>违法信息举报</Note>
        </BottomWrapper>
      </DesktopOnly>

      <MobileOnly>
        <BottomWrapper>
          <Row>
            {metric === METRIC.HOME && <Note>Made in ChengDu</Note>}
            {metric === METRIC.HOME && <LineDivider height={10} left={8} right={6} />}
            <Note>违法信息举报</Note>
          </Row>
          <Br bottom={5} />
          {!isEmpty(BEIAN_TEXT) && (
            <Note>
              <Addr href={BEIAN_ADDR} target="_blank" prefetch={false}>
                {BEIAN_TEXT}
              </Addr>
            </Note>
          )}
        </BottomWrapper>
      </MobileOnly>
    </Wrapper>
  )
}
