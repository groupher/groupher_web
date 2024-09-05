import type { FC, ReactNode } from 'react'

import ThemeSelect from './ThemeSelect'
import useSalon from '../styles/section_label'

type TProps = {
  title: string
  desc?: ReactNode
  addon?: ReactNode
  width?: string
  withThemeSelect?: boolean
}

const SectionLabel: FC<TProps> = ({
  title,
  desc = null,
  addon = null,
  width = '100%',
  withThemeSelect = false,
}) => {
  const s = useSalon({ width, desc })

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h3 className={s.title}>
          {title}
          {withThemeSelect && (
            <>
              <div className="grow" /> <ThemeSelect />
            </>
          )}
        </h3>
        <div className="grow" />
        {addon}
      </div>
      {desc && <div className={s.desc}>{desc}</div>}
    </div>
  )
}

export default SectionLabel
