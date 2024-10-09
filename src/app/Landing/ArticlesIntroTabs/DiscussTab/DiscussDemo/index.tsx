import type { FC } from 'react'

import { mockUsers } from '~/mock'
import { ARTICLE_CAT } from '~/const/gtd'
import { COLOR_NAME } from '~/const/colors'

import UpvoteSVG from '~/icons/Upvote'
import CommentSVG from '~/icons/Comment'

import ArticleCatState from '~/widgets/ArticleCatState'
import TagNode from '~/widgets/TagNode'

import PostItem from './PostItem'
import CommentItem from './CommentItem'

import useSalon, { cn } from '../../../styles/articles_intro_tabs/discuss_tab/discuss_demo'

const DiscussDemo: FC = () => {
  const s = useSalon()

  const users = mockUsers(5)

  return (
    <div className={s.wrapper}>
      <div className={s.listCard}>
        <PostItem
          count={101}
          opacity={0.85}
          width={80}
          title="蹲一个暗黑模式"
          cat={ARTICLE_CAT.FEATURE}
        />
        <PostItem
          opacity={0.75}
          count={65}
          width={90}
          title="手机上点击标题没反应"
          cat={ARTICLE_CAT.BUG}
        />
        <PostItem opacity={0.65} count={44} width={60} title="希望更新日志支持视频内容" />
        <PostItem
          opacity={0.5}
          count={86}
          width={110}
          title="管理员可以删除评论吗"
          cat={ARTICLE_CAT.QUESTION}
        />
        <PostItem
          opacity={0.38}
          count={74}
          width={70}
          title="是否支持私有部署"
          cat={ARTICLE_CAT.QUESTION}
        />
        <PostItem
          opacity={0.25}
          count={13}
          width={88}
          title="安卓版本在哪里下载"
          cat={ARTICLE_CAT.QUESTION}
        />
      </div>

      <div className={s.detailCard}>
        <div className={s.header}>
          <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={3} />
          <div className={s.tagBox}>
            <TagNode color={COLOR_NAME.PURPLE} boldHash />
            <div className={s.tag}>UI / UX</div>
          </div>
        </div>

        <div className={s.title}>蹲一个暗黑模式</div>
        <div className={s.status}>
          <div className={s.upvote}>
            <UpvoteSVG className={s.icon} />
            <div className={s.count}>101</div>
          </div>

          <div className="grow" />
          <CommentSVG className={s.commentIcon} />
          <div className={s.commentCount}>18</div>
        </div>

        <div className={s.content}>
          <div className={cn(s.bar, 'w-8/12')} />
          <div className={cn(s.bar, 'w-10/12 top-5 opacity-25')} />
          <div className={cn(s.bar, 'w-6/12 top-10 opacity-25')} />
          <div className={cn(s.bar, 'w-4/12 top-14 mt-1 opacity-20')} />
        </div>

        <div className={s.commentsHeader}>
          评论 <div className={s.commentCount}>18</div>
          <div className="grow" />
          <div className={cn(s.bar, 'w-8 mt-1 right-6 opacity-15')} />
        </div>
        <CommentItem index={0} user={users[0]} opacity={0.9} />
        <CommentItem index={1} user={users[1]} opacity={0.68} />
        <CommentItem index={2} user={users[2]} opacity={0.42} />
        <CommentItem index={3} user={users[4]} opacity={0.25} />
      </div>
    </div>
  )
}

export default DiscussDemo
