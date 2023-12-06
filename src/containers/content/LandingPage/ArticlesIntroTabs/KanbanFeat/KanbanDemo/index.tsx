import { FC } from 'react'

import { ARTICLE_CAT } from '@/constant/gtd'

import Banner from './Banner'
import KanbanItem from './KanbanItem'

import { BoardsWrapper, Board } from '../../../styles/articles_intro_tabs/kanban_feat/kanban_demo'

const KanbanDemo: FC = () => {
  return (
    <>
      <Banner />
      <BoardsWrapper>
        <Board>
          <KanbanItem count={17} title="更新日志支持视频" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.85} count={4} title="新建社区名字重名" cat={ARTICLE_CAT.BUG} />
          <KanbanItem opacity={0.75} count={6} title="支持私有部署" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.55} count={13} title="编辑器粗体失效" cat={ARTICLE_CAT.BUG} />
          <KanbanItem opacity={0.35} count={2} title="支持多语言" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.25} />
        </Board>
        <Board>
          <KanbanItem count={21} title="支持暗黑模式" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem
            draging
            opacity={0.85}
            count={11}
            title="手机标题点击失效"
            cat={ARTICLE_CAT.BUG}
          />
          <KanbanItem opacity={0.8} count={16} title="微信登录失效" cat={ARTICLE_CAT.BUG} />
          <KanbanItem opacity={0.6} count={21} title="Markdown 导入" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.25} count={9} title="CVS 导出备份" cat={ARTICLE_CAT.FEATURE} />
        </Board>
        <Board>
          <KanbanItem count={72} title="帖子支持多种布局" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.95} count={12} dragTarget />
          <KanbanItem opacity={0.95} count={12} title="管理员权限细化" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.65} count={41} title="SEO 信息显示重复" cat={ARTICLE_CAT.BUG} />
          <KanbanItem opacity={0.55} count={87} title="评论支持 @" cat={ARTICLE_CAT.FEATURE} />
          <KanbanItem opacity={0.3} count={62} title="评论支持盖楼" cat={ARTICLE_CAT.FEATURE} />
        </Board>
      </BoardsWrapper>
    </>
  )
}

export default KanbanDemo
