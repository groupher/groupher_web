import { FC } from 'react'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import Footer from './Footer'
import { Icon } from '../styles/icon'
import { Wrapper, Item, Title, CheckIcon } from '../styles/sub_menu/cat_setting'

type TProps = {
  onBack: () => void
}

const CatSetting: FC<TProps> = ({ onBack }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <Item $active>
        <Icon.Light />
        <Title $active>功能建议</Title>
        <CheckIcon $color={primaryColor} />
      </Item>

      <Item>
        <Icon.Bug />
        <Title>问题上报</Title>
      </Item>

      <Item>
        <Icon.Question />
        <Title>求助/疑问</Title>
      </Item>

      <Item>
        <Icon.Discuss />
        <Title>一般讨论</Title>
      </Item>

      <Footer
        onBack={onBack}
        onConfirm={() => console.log('## title confirm')}
        top={20}
        bottom={5}
      />
    </Wrapper>
  )
}

export default CatSetting
