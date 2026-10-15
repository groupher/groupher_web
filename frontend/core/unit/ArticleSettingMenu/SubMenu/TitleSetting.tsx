import { type FC, useState } from 'react'

import useViewingArticle from '~/hooks/useViewingArticle'
import { updateViewingArticle } from '~/signal'
import Input from '~/ui/Input'
import { toast } from '~/ui/Toaster'

import { getArticlePath } from '../helper'
import S from '../schema'
import useTouched from '../useTouched'
import Footer from './Footer'
import useSalon from './salon/title_setting'

type TProps = {
  onBack: () => void
}

const TitleSetting: FC<TProps> = ({ onBack }) => {
  const s = useSalon()

  const { article } = useViewingArticle()
  const [title, setTitle] = useState(article.title ?? '')
  const { touched, setTouched, resetTouched } = useTouched()
  const [result, updatePost] = useArticleSettingMutation(S.updatePost)

  const handleUpdate = () => {
    const articlePath = getArticlePath(article)
    if (!articlePath || article.version === undefined) {
      toast('文章信息不完整', 'error')
      return
    }

    const params = {
      article: articlePath,
      expectedVersion: article.version,
      title,
    }

    updatePost(params).then((result) => {
      if (result.error) {
        toast('修改失败', 'error')
      } else if (result.data?.updatePost?.title) {
        toast('修改完成')
        const newTitle = result.data.updatePost.title
        setTitle(newTitle)
        if (article.id) updateViewingArticle({ id: article.id, title: newTitle })
        resetTouched()
      }
    })
  }

  return (
    <div className={s.wrapper}>
      <Input
        className={s.input}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          setTouched(e.target.value !== article.title)
        }}
      />
      <div className={s.note}>
        修改记录会显示在下方日志中。管理员仅能修改标题，帖子作者仅能修改内容。
      </div>
      <Footer
        onBack={onBack}
        disabled={!touched}
        top={10}
        loading={result.fetching}
        onConfirm={() => handleUpdate()}
      />
    </div>
  )
}

export default TitleSetting
import useArticleSettingMutation from '~/query/mutation/useArticleSettingMutation'
