import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'

import useViewingCommunity from '@/hooks/useViewingCommunity'

import { SexyDivider } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, Note, Bold, Inputer } from '../../styles/basic_info/danger_zone/confirm_footer'

type TProps = {
  testid?: string
} & TSpace

const ConfirmFooter: FC<TProps> = ({ testid = '', ...restprops }) => {
  const [msg, setMsg] = useState('')
  const { slug } = useViewingCommunity()

  return (
    <Wrapper {...restprops}>
      <SexyDivider />
      <Note>
        请在下方输入社区名称<Bold>{slug}</Bold>确认
      </Note>
      <Inputer autoFocus onChange={(e) => setMsg(e.target.value)} value={msg} />
      <Button type="red" top={14} bottom={18} disabled={msg !== slug}>
        我已了解，确认删除
      </Button>
    </Wrapper>
  )
}

export default observer(ConfirmFooter)
