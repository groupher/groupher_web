/* eslint-disable jsx-a11y/accessible-emoji */
/*
 *
 * TagNote
 *
 */

import Markdown from 'markdown-to-jsx'
import type { TColorName } from '~/spec'

import useActiveTag from '~/hooks/useActiveTag'
import TagNode from '~/widgets/TagNode'

import useSalon from './styles'

export default () => {
  const tag = useActiveTag()
  const s = useSalon({ color: tag?.color as TColorName })

  if (!tag?.title) return null

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.tagWrapper}>
          <TagNode
            color={tag.color as TColorName}
            dotSize={8}
            hashSize={3}
            dotLeft={5}
            hashLeft={0.5}
            hashRight={1}
            boldHash
          />
          <div className={s.title}>{tag.title}</div>
        </div>
      </div>
      <div>
        <Markdown>{tag.desc || ''}</Markdown>
      </div>
    </div>
  )
}
