import { FC } from 'react'

import {
  Wrapper,
  Item,
  EmojiImg,
  Count,
} from '../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/emotion_bar_bad'

const EMOTION_STATIC = '/icons/static/emotion'

const EditorPreview: FC = () => {
  return (
    <Wrapper>
      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/downvote.png`} />
        <Count>14</Count>
      </Item>

      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/confused.png`} />
        <Count>12</Count>
      </Item>

      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/pill.png`} />
        <Count>35</Count>
      </Item>
    </Wrapper>
  )
}

export default EditorPreview
