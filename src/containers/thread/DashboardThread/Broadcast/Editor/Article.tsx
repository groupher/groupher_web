import { Br } from '~/widgets/Common'
import ColorSelector from '~/widgets/ColorSelector'
import ToggleSwitch from '~/widgets/Buttons/ToggleSwitch'

import SectionLabel from '../../SectionLabel'
import ArticleTemplate from '../Templates/Article'
import SavingBar from '../../SavingBar'

import useBroadcast from '../../logic/useBroadcast'
import {
  Wrapper,
  Item,
  Label,
  BgLabel,
  TheColor,
  Inputer,
  EnableDesc,
} from '../../styles/broadcast/editor/article'

export default () => {
  const {
    saving,
    broadcastArticleBg,
    broadcastOnSave,
    broadcastOnCancel,
    broadcastArticleEnable,
    getIsArticleTouched,
    edit,
  } = useBroadcast()

  const isArticleTouched = getIsArticleTouched()

  return (
    <Wrapper>
      <SectionLabel
        title="开启页脚广播"
        desc={<EnableDesc>开启后，相关帖子底部会出现广播内容</EnableDesc>}
        addon={
          <ToggleSwitch
            checked={broadcastArticleEnable}
            onChange={(v) => edit(v, 'broadcastArticleEnable')}
          />
        }
      />
      <Br bottom={10} />
      <ArticleTemplate />
      <Br bottom={50} />
      <Item>
        <Label>背景色：</Label>
        <BgLabel bg={broadcastArticleBg}>
          <ColorSelector
            activeColor={broadcastArticleBg}
            onChange={(color) => edit(color, 'broadcastArticleBg')}
            placement="right"
            offset={[-1, 15]}
          >
            <TheColor color={broadcastArticleBg} />
          </ColorSelector>
        </BgLabel>
      </Item>

      <Item>
        <Label>广播内容</Label>
        <Inputer />
      </Item>

      <Item>
        <Label>链接地址</Label>
        <Inputer />
      </Item>

      <SavingBar
        isTouched={isArticleTouched}
        onCancel={() => broadcastOnCancel(true)}
        onConfirm={() => broadcastOnSave(true)}
        loading={saving}
        top={50}
      />
    </Wrapper>
  )
}
