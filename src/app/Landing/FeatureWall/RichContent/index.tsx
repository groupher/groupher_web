import useHover from '~/hooks/useHover'

import Panel from './Panel'
import useSalon from '../../styles/feature_wall/rich_content'

export default () => {
  const s = useSalon()

  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <div ref={cardRef} className={s.wrapper}>
      <Panel hovering={isCardHovered} />
      <div className={s.footer}>
        <h3 className={s.title}>富文本内容</h3>
        <div className={s.desc}>支持主流富文本内容及多媒体，兼容 Markdown。</div>
      </div>
    </div>
  )
}
