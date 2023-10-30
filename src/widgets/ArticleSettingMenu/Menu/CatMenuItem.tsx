import { FC } from 'react'
import { observer } from 'mobx-react'

import { SpaceGrow } from '@/widgets/Common'
import useViewingArticle from '@/hooks/useViewingArticle'
import { Trans } from '@/i18n'

import { Icon } from '../styles/icon'
import { MenuItem } from '../styles/menu'

type TProps = {
  onClick: () => void
}

const CatMenuItem: FC<TProps> = ({ onClick }) => {
  const { article } = useViewingArticle()

  if (article.cat) {
    const TheIcon = Icon[article.cat]
    return (
      <MenuItem onClick={onClick}>
        <TheIcon />
        {Trans(article.cat)}
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={onClick}>
      <Icon.Category />
      分类
      <SpaceGrow />
      <Icon.Arrow />
    </MenuItem>
  )
}

export default observer(CatMenuItem)
