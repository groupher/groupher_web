import type { TColorName } from '~/spec'

import ArrowLinker from '~/widgets/ArrowLinker'
import Button from '~/widgets/Buttons/Button'

import type { TIntroTab } from '../spec'
import FeatItem from './FeatItem'

import useSalon from '../../styles/dashboard_intros/side_intros'

type TProps = {
  tab: TIntroTab
  color?: TColorName
}

export default ({ tab, color = 'PURPLE' }: TProps) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.head}>
        <div className={s.title}>布局 & 样式</div>
        <div className={s.desc}>社区与内容展示的各种个性化设置</div>
        <div className={s.barDivider} />
      </div>
      <FeatItem text="社区基本信息，主题色" color={color} />
      <FeatItem text="品牌展示样式。" color={color} />
      <FeatItem text="社区整体布局，" color={color} />
      <FeatItem text="讨论区布局。" color={color} />
      <FeatItem text="看板布局，背景颜色。" color={color} />
      <FeatItem text="更新日志布局。" color={color} />
      <FeatItem text="壁纸，辉光，毛玻璃效果。" color={color} />

      <div className={s.footer}>
        <Button color={color} ghost className="w-20">
          查看示例
        </Button>

        <ArrowLinker href="/" color={color}>
          了解更多
        </ArrowLinker>
      </div>
    </div>
  )
}
