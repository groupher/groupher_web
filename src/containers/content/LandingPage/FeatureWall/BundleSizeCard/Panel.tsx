import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Item,
  Header,
  Title,
  Size,
  Bar,
} from '../../styles/feature_wall/bundle_size_card/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      <Item>
        <Header>
          <Title>Groupher</Title>
          <SpaceGrow />
          <Size>313 KB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Flarum</Title>
          <SpaceGrow />
          <Size>401 KB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Github Discussion</Title>
          <SpaceGrow />
          <Size>554 KB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Canny</Title>
          <SpaceGrow />
          <Size>1.1+ MB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>UserVoice</Title>
          <SpaceGrow />
          <Size>515 KB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Outverse</Title>
          <SpaceGrow />
          <Size>1.5 MB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Circle</Title>
          <SpaceGrow />
          <Size>3.5+ MB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>Discourse</Title>
          <SpaceGrow />
          <Size>1.5+ MB</Size>
        </Header>
        <Bar />
      </Item>

      <Item>
        <Header>
          <Title>兔小巢</Title>
          <SpaceGrow />
          <Size>1.8+ MB</Size>
        </Header>
        <Bar />
      </Item>
    </Wrapper>
  )
}

export default Panel
