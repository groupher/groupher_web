import type { FC } from 'react'

import useViewingArticle from '~/hooks/useViewingArticle'
import { Trans } from '~/i18n'

import { Icon } from '../styles/icon'
import { MenuItem } from '../styles/menu'

type TProps = {
  onClick: () => void
}

const CatItem: FC<TProps> = ({ onClick }) => {
  const { article } = useViewingArticle()

  if (!article) return null

  if (article.cat) {
    const TheIcon = Icon[article.cat]
    return (
      <MenuItem onClick={onClick}>
        <TheIcon />
        {Trans(article.cat)}
        <div className="grow" />
        <Icon.Arrow />
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={onClick}>
      <Icon.Category />
      分类
      <div className="grow" />
      <Icon.Arrow />
    </MenuItem>
  )
}

export default CatItem
