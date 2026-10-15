import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from 'motion/react'
import { useState } from 'react'

import { SAVING_BAR_LAYOUT_TRANSITION } from '../../../../SavingBar/constant'
import type { TThemeDetails } from '../../spec'
import useSalon from '../salon/colors'
import ColorItem from './ColorItem'
import { MAIN_COLOR_DETAILS, EXTRA_COLOR_DETAILS } from './constant'

type TProps = {
  details: TThemeDetails
}

export default function Colors({ details }: TProps) {
  const s = useSalon()
  const { selectedTokens, onThemePresetCommit } = details
  const [expanded, setExpanded] = useState(false)

  const toggleLabel = expanded ? 'show less' : `${EXTRA_COLOR_DETAILS.length} more`

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion features={domAnimation}>
        <m.div layout transition={{ layout: SAVING_BAR_LAYOUT_TRANSITION }} className={s.wrapper}>
          {MAIN_COLOR_DETAILS.map((detail) => (
            <ColorItem
              key={detail.key}
              detail={detail}
              selectedTokens={selectedTokens}
              onThemePresetCommit={onThemePresetCommit}
            />
          ))}

          <AnimatePresence initial={false}>
            {expanded && (
              <m.div
                key='more-colors'
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={SAVING_BAR_LAYOUT_TRANSITION}
                className={s.moreColorsClip}
              >
                <div className={s.moreColors}>
                  {EXTRA_COLOR_DETAILS.map((detail) => (
                    <ColorItem
                      key={detail.key}
                      detail={detail}
                      selectedTokens={selectedTokens}
                      onThemePresetCommit={onThemePresetCommit}
                    />
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <div className={s.dividerRow}>
            <div className={s.toggleMask} aria-hidden>
              {toggleLabel}
            </div>
            <button
              type='button'
              className={s.toggle}
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              <span className={s.toggleText}>{toggleLabel}</span>
            </button>
          </div>
        </m.div>
      </LazyMotion>
    </MotionConfig>
  )
}
