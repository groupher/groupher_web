import { ROUTE } from '~/const/route'

import Img from '~/Img'
import Button from '~/widgets/Buttons/Button'
import BorderButton from '~/widgets/Buttons/BorderButton'

import { LinkAble } from '~/widgets/Common'

import useSalon from '../styles/footer'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <Img src="groupher.png" className={s.logo} />

      <h3 className={s.title}>节省团队宝贵时间</h3>
      <div className={s.desc}>
        你只需专注于产品的<span className={s.hightLight}>核心功能</span>，将周边的「
        <span className={s.hightLight}>杂活儿</span>
        」交给 Groupher
      </div>
      <div className={s.buttons}>
        <LinkAble href={ROUTE.APPLY_COMMUNITY}>
          <BorderButton space={8}>创建新社区</BorderButton>
        </LinkAble>

        <Button size="medium" ghost>
          预约演示
        </Button>
      </div>
    </div>
  )
}
