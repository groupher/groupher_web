import { AnimatePresence, m } from 'motion/react'
import { type ChangeEvent, type FC, useMemo, useState } from 'react'

import useTrans from '~/hooks/useTrans'
import type { TTransKey } from '~/spec'
import Input from '~/ui/Input'

import { FEEDBACK_NOTE_PLACEHOLDER_I18N_KEY, FEEDBACK_TAGS_TITLE_I18N_KEY } from '../constant'
import { getFeedbackTagsByScore, toggleFeedbackTag } from '../helper'
import useSalon from './salon'
import TagLabel from './TagLabel'

type TProps = {
  score: number
}

const FeedbackTags: FC<TProps> = ({ score }) => {
  const s = useSalon()
  const { t } = useTrans()
  const tags = useMemo(() => getFeedbackTagsByScore(score), [score])
  const [selectedTags, setSelectedTags] = useState<TTransKey[]>([])
  const [note, setNote] = useState('')
  const selectedTagSet = useMemo(() => new Set(selectedTags), [selectedTags])
  const hasSelectedTag = selectedTags.length > 0

  const handleTagClick = (tag: TTransKey) => {
    setSelectedTags((selected) => toggleFeedbackTag(selected, tag))
  }

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  }

  return (
    <m.div
      layout
      transition={{ layout: { duration: 0.16, ease: 'easeInOut' } }}
      className={s.wrapper}
    >
      <div className={s.title}>{t(FEEDBACK_TAGS_TITLE_I18N_KEY)}</div>

      <div className={s.tags}>
        {tags.map((tag) => (
          <TagLabel
            key={tag}
            label={t(tag)}
            active={selectedTagSet.has(tag)}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {hasSelectedTag && (
          <m.div
            key='feedback-note'
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeInOut' }}
            className={s.inputMotion}
          >
            <Input
              value={note}
              placeholder={t(FEEDBACK_NOTE_PLACEHOLDER_I18N_KEY)}
              onChange={handleNoteChange}
            />
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default FeedbackTags
