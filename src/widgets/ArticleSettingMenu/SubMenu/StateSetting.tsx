import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useMutation } from 'urql'

import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingArticle from '@/hooks/useViewingArticle'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'
import { POST_STATE_MENU_ITEMS } from '@/constant/menu'
import { ARTICLE_STATE } from '@/constant/gtd'
import { toast, updateViewingArticle } from '@/signal'
import { aliasGTDDoneState } from '@/fmt'

import S from '../schema'
import Footer from './Footer'
import { getGTDColor } from '../helper'
import { Icon } from '../styles/icon'

import { Wrapper, Item, Divider, Title, CheckIcon } from '../styles/sub_menu/state_setting'

type TProps = {
  onBack: () => void
}

const StateSetting: FC<TProps> = ({ onBack }) => {
  const primaryColor = usePrimaryColor()
  const { article } = useViewingArticle()
  const bgColors = useKanbanBgColors()
  const [state, setState] = useState(article.state)

  const [result, setPostState] = useMutation(S.setPostState)

  useEffect(() => {
    setState(article.state)
  }, [])

  const handleState = () => {
    const params = { id: article.id, state }
    setPostState(params).then((result) => {
      if (result.error) {
        toast('修改失败', 'error')
      } else {
        toast('修改完成')
        const newState = result.data.setPostState.state
        setState(newState)
        updateViewingArticle({ id: article.id, state: newState })
      }
    })
  }

  return (
    <Wrapper>
      {POST_STATE_MENU_ITEMS.map((item, index) => {
        const TheIcon = Icon[item.key] || Icon[ARTICLE_STATE.REJECT]
        const $active = item.key === state
        const $color = getGTDColor(item.key, bgColors)

        return (
          <Item
            $active={$active}
            key={item.key}
            onClick={() => setState(item.key)}
            $color={$color}
            hasDivider={index === 3}
          >
            {index === 3 && <Divider />}
            {/* @ts-ignore */}
            <TheIcon $active={$active} $color={$color} />
            <Title $active={$active}>{Trans(aliasGTDDoneState(article.cat, item.key))}</Title>
            {$active && <CheckIcon $color={primaryColor} />}
          </Item>
        )
      })}

      <Footer
        onBack={onBack}
        loading={result.fetching}
        onConfirm={() => handleState()}
        top={20}
        bottom={5}
      />
    </Wrapper>
  )
}

export default observer(StateSetting)
