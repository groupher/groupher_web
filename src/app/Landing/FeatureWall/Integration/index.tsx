import useHover from '~/hooks/useHover'

import Panel from './Panel'

import useSalon from '../../styles/feature_wall/integration'

export default () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()
  const s = useSalon()

  return (
    <div ref={cardRef} className={s.wrapper}>
      <Panel hovering={isCardHovered} />
      <div className={s.footer}>
        <h3 className={s.title}>一键集成</h3>
        <div className={s.desc}>
          一行代码让你的网站通过 Sidebar/Modal/iframe 等方式接入反馈组件。
        </div>
      </div>
    </div>
  )
}
