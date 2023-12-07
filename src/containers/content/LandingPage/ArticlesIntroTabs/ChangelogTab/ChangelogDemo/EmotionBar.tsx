import { FC } from 'react'

import {
  Wrapper,
  Item,
  EmojiImg,
  Count,
} from '../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/emotion_bar'

const EMOTION_STATIC = '/icons/static/emotion'

const EditorPreview: FC = () => {
  return (
    <Wrapper>
      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/tada.png`} />
        <Count>41</Count>
      </Item>

      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/beer.png`} />
        <Count>32</Count>
      </Item>

      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/biceps.png`} />
        <Count>17</Count>
      </Item>

      <Item>
        <EmojiImg src={`${EMOTION_STATIC}/popcorn.png`} />
        <Count>10</Count>
      </Item>
    </Wrapper>
  )
}

export default EditorPreview
