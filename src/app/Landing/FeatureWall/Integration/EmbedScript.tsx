import TerminalSVG from '~/icons/Terminal'

import useSalon from '../../styles/feature_wall/integration/embed_script'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <TerminalSVG className={s.icon} />

      <div className={s.codes}>
        script: groupher/<span className={s.embed}>embed</span>?id=
        <span className={s.redText}>your-site</span>
      </div>

      <div className={s.cursor} />
    </div>
  )
}
