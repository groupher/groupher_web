/*
 *
 * PublishButton
 *
 */

import { memo, type FC } from 'react'
import EditPenSVG from '~/icons/EditPen'

import useSalon from '../styles/publish_button/post_layout'

type TProps = {
  text: string
}

const PostLayout: FC<TProps> = ({ text }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{text}</div>
      <div className="grow" />
      <EditPenSVG className={s.editIcon} />
    </div>
  )
}

export default memo(PostLayout)
