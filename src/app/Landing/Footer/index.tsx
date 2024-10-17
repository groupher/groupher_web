import { ROUTE } from '~/const/route'

import Img from '~/Img'
import Button from '~/widgets/Buttons/Button'

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
          <Button className={s.createButton} style={s.createButtonStyle} size="medium">
            创建我的社区
          </Button>
        </LinkAble>

        <Button size="medium" ghost>
          预约演示
        </Button>
      </div>
    </div>
  )
}
