import useSalon from './salon'

type TProps = {
  isActive: boolean
}

export default function ClassicPreview({ isActive }: TProps) {
  const s = useSalon()

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={s.frame}>
        <div className={s.classicList}>
          <div className={s.classicEntry}>
            <div className={s.classicCover} />
            <div className={s.classicText}>
              <div className={s.classicTitle} />
              <div className={s.classicBodyWide} />
              <div className={s.classicBodyNarrow} />
            </div>
          </div>

          <div className={s.classicEntry}>
            <div className={s.classicCover} />
            <div className={s.classicText}>
              <div className={s.classicTitle} />
              <div className={s.classicBodyNarrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
