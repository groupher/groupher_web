import { type FC, memo, useCallback } from 'react'

import type { TComment } from '~/spec'
import { ICON } from '~/config'
import useAccount from '~/hooks/useAccount'

import { authWarn } from '~/signal'

import MenuButton from '~/widgets/Buttons/MenuButton'

import useLogic from '../useLogic'
import { Wrapper, ReplyAction, MoreWrapper, MoreIcon } from '../styles/comment/actions'

const menuOptions = [
  // {
  //   key: 'quote',
  //   icon: `${ICON}/shape/quote.svg`,
  //   title: '引用',
  // },
  {
    key: 'share',
    icon: `${ICON}/article/share.svg`,
    title: '分享',
  },
  {
    key: 'report',
    icon: `${ICON}/article/report.svg`,
    title: '举报',
  },
]

type TProps = {
  data: TComment
}

const Actions: FC<TProps> = ({ data }) => {
  const accountInfo = useAccount()
  const { openUpdateEditor, openReplyEditor } = useLogic()

  let extraOptions = []

  if (data.author.login === accountInfo?.login) {
    extraOptions = [
      {
        key: 'edit',
        icon: `${ICON}/edit/publish-pen.svg`,
        title: '编辑',
      },
      {
        key: 'delete',
        icon: `${ICON}/shape/delete.svg`,
        title: '删除',
      },
    ]
  }

  const handleAction = useCallback(
    (key) => {
      if (!accountInfo) return authWarn()

      switch (key) {
        case 'share': {
          return console.log('## todo: share')
        }
        case 'quote': {
          return console.log('## todo: quote')
        }
        case 'report': {
          return console.log('## todo: report')
        }
        case 'edit': {
          return openUpdateEditor(data)
        }
        case 'delete': {
          return console.log('## todo: delete')
        }
        default: {
          // eslint-disable-next-line no-useless-return
          return
        }
      }
    },
    [data, accountInfo],
  )

  return (
    <Wrapper>
      {data.meta.isLegal && (
        <ReplyAction
          onClick={() => {
            if (accountInfo) return authWarn()

            openReplyEditor(data)
          }}
        >
          回复
        </ReplyAction>
      )}

      <div className="grow" />
      <MenuButton options={menuOptions} extraOptions={extraOptions} onClick={handleAction}>
        <MoreWrapper>
          <MoreIcon />
        </MoreWrapper>
      </MenuButton>
    </Wrapper>
  )
}

export default memo(Actions)
