import { isEmpty } from 'ramda'

import useAboutInfo from '~/hooks/useAboutInfo'

import { Divider } from '~/widgets/Common'
import Linker from '~/widgets/Linker'
import SocialList from '~/widgets/SocialList'

import LabelList from './LabelList'
import MediaReports from './MediaReports'

import { Wrapper, MobileWrapper, Block, Title, Desc } from './styles/sidebar'

const Content = () => {
  const { homepage, cities, techstacks, socialLinks, mediaReports } = useAboutInfo()

  const noMediaReports = mediaReports.length <= 1 && !mediaReports[0].title

  return (
    <>
      <Block hide={isEmpty(homepage)}>
        <Title>官方主页</Title>
        <Desc>
          <Linker src={homepage} left={-2} />
        </Desc>
      </Block>
      <Block hide={isEmpty(socialLinks)}>
        <Title>关注我们</Title>
        <SocialList size="small" selected={socialLinks} left={-10} top={12} />
      </Block>
      <Divider />
      <Block hide={isEmpty(cities)}>
        <Title>所在地</Title>
        <Desc>
          <LabelList items={cities} left={-2} />
        </Desc>
      </Block>
      <Block hide={isEmpty(techstacks)}>
        <Title>技术栈</Title>
        <Desc>
          <LabelList items={techstacks} left={-2} />
        </Desc>
      </Block>
      {!noMediaReports && <Divider />}
      <Block hide={noMediaReports}>
        <Title>媒体报道</Title>
        <MediaReports items={mediaReports} />
      </Block>
    </>
  )
}

export default () => {
  return (
    <>
      <MobileWrapper>
        <Content />
      </MobileWrapper>

      <Wrapper>
        <Content />
      </Wrapper>
    </>
  )
}
