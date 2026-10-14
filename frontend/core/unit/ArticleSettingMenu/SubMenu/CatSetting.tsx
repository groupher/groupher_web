import { type FC, useState } from 'react'

import { POST_CAT_MENU_ITEMS } from '~/const/menu'
import { toGTDLabelKey } from '~/fmt'
import useTrans from '~/hooks/useTrans'
import useViewingArticle from '~/hooks/useViewingArticle'
import CheckSVG from '~/icons/CheckBold'
import { updateViewingArticle } from '~/signal'
import { toast } from '~/ui/Toaster'

import { ICON } from '../constant'
import { getArticlePath } from '../helper'
import S from '../schema'
import useTouched from '../useTouched'
import Footer from './Footer'
import useSalon, { cn } from './salon/cat_setting'

type TProps = {
  onBack: () => void
}

const CatSetting: FC<TProps> = ({ onBack }) => {
  const s = useSalon()
  const { t } = useTrans()

  const { article } = useViewingArticle()
  const [cat, setCat] = useState(article.cat)

  const { touched, setTouched, resetTouched } = useTouched()

  const [result, setPostCat] = useArticleSettingMutation(S.setPostCat)

  const handleCat = () => {
    const articlePath = getArticlePath(article)
    if (!articlePath || !cat) {
      toast('文章信息不完整', 'error')
      return
    }

    const params = {
      article: articlePath,
      cat,
    }

    setPostCat(params).then((result) => {
      if (result.error) {
        toast('修改失败', 'error')
      } else if (result.data?.setPostCat?.cat) {
        toast('修改完成')
        const newCat = result.data.setPostCat.cat
        setCat(newCat)
        if (article.id) updateViewingArticle({ id: article.id, cat: newCat })
        resetTouched()
      }
    })
  }

  return (
    <div className={s.wrapper}>
      {POST_CAT_MENU_ITEMS.map((item) => {
        const TheIcon = ICON[item.key]
        const $active = item.key === cat

        return (
          <button
            type='button'
            key={item.key}
            className={cn(s.item, $active && s.itemActive)}
            onClick={() => {
              setCat(item.key)
              setTouched(item.key !== article.cat)
            }}
          >
            <TheIcon className={s.icon} />
            <div className={cn(s.title, $active && s.titleActive)}>
              {t(toGTDLabelKey(item.key))}
            </div>
            {$active && <CheckSVG className={s.checkIcon} />}
          </button>
        )
      })}

      <Footer
        onBack={onBack}
        loading={result.fetching}
        disabled={!touched}
        onConfirm={() => handleCat()}
        top={4}
      />
    </div>
  )
}

export default CatSetting
import useArticleSettingMutation from '~/query/mutation/useArticleSettingMutation'
