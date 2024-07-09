import type { FC } from 'react'

import { Br } from '~/widgets/Common'

import {
  Wrapper,
  PinnedItem,
  BookIcon,
  GithubIcon,
  DirName,
  File,
} from '../../../styles/articles_intro_tabs/help_tab/help_demo/dir_tree'

const DirTree: FC = () => {
  return (
    <Wrapper>
      <PinnedItem>
        <BookIcon />
        <File>全部文档</File>
      </PinnedItem>
      <PinnedItem>
        <GithubIcon />
        <File>Github</File>
      </PinnedItem>
      <Br top={12} />

      <DirName>社区</DirName>
      <File>基本信息</File>
      <File>整体布局</File>
      <File>管理员</File>

      <Br top={15} />
      <DirName>讨论区</DirName>
      <File>帖子布局</File>
      <File>标签设置</File>

      <Br top={15} />
      <DirName opacity={0.75}>看板</DirName>
      <File opacity={0.7}>看板颜色</File>
      <File opacity={0.6}>状态转换</File>
      <Br top={15} />

      <DirName opacity={0.5}>更新日志</DirName>
      <File opacity={0.45}>封面编辑器</File>
      <File opacity={0.4}>基本信息设置</File>
    </Wrapper>
  )
}

export default DirTree
