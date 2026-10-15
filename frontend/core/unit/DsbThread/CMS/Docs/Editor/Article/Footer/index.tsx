'use client'

import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from 'motion/react'
import { type FC, useCallback, useState } from 'react'

import useTrans from '~/hooks/useTrans'
import FeedbackSpectrum from '~/ui/FeedbackSpectrum'

import ActionButton from './ActionButton'
import { FOOTER_ACTIONS, FOOTER_TITLE_I18N_KEY } from './constant'
import FeedbackTags from './FeedbackTags'
import useSalon from './salon'

const Footer: FC = () => {
  const s = useSalon()
  const { t } = useTrans()
  const [showFeedbackTags, setShowFeedbackTags] = useState(false)
  const [feedbackScore, setFeedbackScore] = useState(0)

  const handleSpectrumDragEnd = useCallback((score: number) => {
    setFeedbackScore(score)
    setShowFeedbackTags(true)
  }, [])

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion features={domAnimation}>
        <m.footer
          layout
          transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
          className={s.wrapper}
        >
          <div className={s.heading}>
            <span className={s.title}>{t(FOOTER_TITLE_I18N_KEY)}</span>
            <span className={s.topDivider} />
          </div>

          <div className={s.content}>
            <FeedbackSpectrum onDragEnd={handleSpectrumDragEnd} />

            <div className={s.actions}>
              {FOOTER_ACTIONS.map((action) => (
                <ActionButton key={action.key} action={action} />
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showFeedbackTags && (
              <m.div
                key='feedback-tags'
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className={s.feedbackTagsMotion}
              >
                <FeedbackTags key={feedbackScore} score={feedbackScore} />
              </m.div>
            )}
          </AnimatePresence>

          <div className={s.bottomDivider} />
        </m.footer>
      </LazyMotion>
    </MotionConfig>
  )
}

export default Footer
