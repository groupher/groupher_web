import { type FC, useEffect, useRef } from 'react'
import { type CursorProps, type NodeApi, type NodeRendererProps, Tree } from 'react-arborist'

import type { TPagedArticles } from '@/spec'

import { treeData, type TTreeItem } from '../treeData'

import Actions from './Actions'
import Note from './Note'

import {
  Wrapper,
  Content,
  FolderWrapper,
  FolderName,
  ArrowUpIcon,
  ArrowDownIcon,
  CustomCursor,
  ActionWrapper,
  EditIcon,
  DeleteIcon,
  DragIcon,
} from '../../../styles/cms/docs/tree'

type TProps = {
  pagedDocs: TPagedArticles
}

// see example: https://codesandbox.io/s/react-arborist-epopl1?file=/src/components/Tree/index.ts

const TreeView: FC<TProps> = ({ pagedDocs }) => {
  const treeRef = useRef()

  useEffect(() => {
    const tree = treeRef.current
    /* See the Tree API reference for all you can do with it. */
  }, [])

  return (
    <Wrapper
      onClick={() => {
        // treeRef.current.createLeaf()
        // treeRef.current.createInternal()
        // console.log('## tree: ', treeRef.current)
        // console.log('## get Data: ', treeRef.current)
        // treeRef.current.unselectAll()
      }}
    >
      <Tree
        ref={treeRef}
        // data={treeData}
        initialData={treeData}
        width={175}
        height={1000}
        rowHeight={35}
        indent={14}
        renderCursor={Cursor}
        paddingBottom={32}
        // disableEdit={(data) => data.readOnly}
        disableDrop={({ parentNode, dragNodes }) => {
          if (
            parentNode.data.name === 'Categories' &&
            dragNodes.some((drag) => drag.data.name === 'Inbox')
          ) {
            return true
          }
          return false
        }}
      >
        {Node}
      </Tree>
      <Content>
        <Actions />
        <Note />
      </Content>
    </Wrapper>
  )
}

function Node({ node, style, dragHandle }: NodeRendererProps<TTreeItem>) {
  // const Icon = node.data?.icon || <span>O</span>
  return (
    <FolderWrapper
      ref={dragHandle}
      style={style}
      onClick={() => node.isInternal && node.toggle()}
      hasChild={node.isInternal && !!node.data.children}
      $active={node.isSelected}
    >
      <DragIcon />
      <FolderName hasChild={!!node.data.children} $active={node.isSelected}>
        {node.isEditing ? <Input node={node} /> : node.data.name}
        <FolderArrow node={node} />
      </FolderName>

      <ActionWrapper>
        <EditIcon />
        <DeleteIcon />
      </ActionWrapper>
      {/* <span>{node.data.unread === 0 ? null : node.data.unread}</span> */}
    </FolderWrapper>
  )
}

function FolderArrow({ node }: { node: NodeApi<TTreeItem> }) {
  if (node.isLeaf) return <span />

  return <>{node.isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}</>
}

function Input({ node }: { node: NodeApi<TTreeItem> }) {
  return (
    <input
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => node.reset()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') node.reset()
        if (e.key === 'Enter') node.submit(e.currentTarget.value)
      }}
    />
  )
}

const Cursor: FC<CursorProps> = ({ top, left }) => {
  // @ts-ignore
  return <CustomCursor top={top} left={left} />
}

export default TreeView
