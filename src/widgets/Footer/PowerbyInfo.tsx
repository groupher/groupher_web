import { isEmpty } from 'ramda'
import Link from 'next/link'

import METRIC from '~/const/metric'
import useMetric from '~/hooks/useMetric'
import { LineDivider } from '~/widgets/Common'

import { BEIAN_ADDR, BEIAN_TEXT } from '~/config'

import useSalon from './salon/powerby_info'

export default () => {
  const s = useSalon()
  const metric = useMetric()

  return (
    <div className={s.wrapper}>
      {metric !== METRIC.HOME && (
        <div className={s.note}>
          由
          <Link className={s.link} href="/">
            Groupher
          </Link>
          提供服务
        </div>
      )}

      <div className={s.bottom}>
        {metric === METRIC.HOME && <div className={s.note}>Made in ChengDu</div>}
        {metric === METRIC.HOME && <LineDivider height={10} left={8} right={6} />}
        {!isEmpty(BEIAN_TEXT) && (
          <div className={s.note}>
            <Link className={s.link} href={BEIAN_ADDR} target="_blank" prefetch={false}>
              {BEIAN_TEXT}
            </Link>
          </div>
        )}
        {/* <LineDivider height={10} left={5} right={6} /> */}
        <div className={s.note}>违法信息举报</div>
      </div>
    </div>
  )
}
