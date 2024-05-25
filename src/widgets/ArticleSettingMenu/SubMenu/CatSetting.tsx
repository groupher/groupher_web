import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useMutation } from 'urql'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingArticle from '@/hooks/useViewingArticle'
import { POST_CAT_MENU_ITEMS } from '@/const/menu'
import { Trans } from '@/i18n'
import { toast, updateViewingArticle } from '@/signal'

import S from '../schema'
import useTouched from '../useTouched'
import Footer from './Footer'
import { Icon } from '../styles/icon'
import { Wrapper, Item, Title, CheckIcon } from '../styles/sub_menu/cat_setting'

type TProps = {
  onBack: () => void
}

const CatSetting: FC<TProps> = ({ onBack }) => {
  const { article } = useViewingArticle()
  const primaryColor = usePrimaryColor()
  const [cat, setCat] = useState(article.cat)

  const { touched, setTouched, resetTouched } = useTouched()
  const [result, setPostCat] = useMutation(S.setPostCat)

  useEffect(() => {
    setCat(article.cat)
  }, [])

  const handleCat = () => {
    const params = { id: article.id, cat }
    setPostCat(params).then((result) => {
      if (result.error) {
        toast('修改失败', 'error')
      } else {
        toast('修改完成')
        const newCat = result.data.setPostCat.cat
        setCat(newCat)
        updateViewingArticle({ id: article.id, cat: newCat })
        resetTouched()
      }
    })
  }

  return (
    <Wrapper>
      {POST_CAT_MENU_ITEMS.map((item) => {
        const TheIcon = Icon[item.key]
        const $active = item.key === cat

        return (
          <Item
            $active={$active}
            key={item.key}
            onClick={() => {
              setCat(item.key)
              setTouched(item.key !== article.cat)
            }}
          >
            <TheIcon />
            <Title $active={$active}>{Trans(item.key)}</Title>
            {$active && <CheckIcon $color={primaryColor} />}
          </Item>
        )
      })}

      <Footer
        onBack={onBack}
        loading={result.fetching}
        disabled={!touched}
        onConfirm={() => handleCat()}
        top={20}
        bottom={5}
      />
    </Wrapper>
  )
}

export default observer(CatSetting)
