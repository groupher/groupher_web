import { FC, ReactNode, useState, useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'

import { COLOR_NAME } from '@/constant/colors'
import { mockUsers } from '@/utils/mock'

import MasonryCards from '@/widgets/MasonryCards'

import Card from './Card'
import {
  Wrapper,
  Slogan,
  Title,
  Desc,
  Wall,
  BgGradient,
  DempP,
  Hightlight,
} from '../styles/users_wall'
import { TColorName } from '@/spec'

const P1 = (markColor: TColorName): ReactNode => (
  <DempP>
    当然如果从产量上来说，黑龙江，河南和山东位居
    <Hightlight color={markColor}>全国前三位</Hightlight>
    ，是2021年我国仅有的三个粮食产量超过5000万吨的大省，不过河南和山东人口也很多，虽然自给自足有余，但是外调就不如黑吉蒙了。
  </DempP>
)

const P2 = (markColor: TColorName): ReactNode => (
  <DempP>
    四川作为人口大省粮食可以自给，而且现代社会需要的
    <Hightlight color={markColor}>水力，天然气，铁矿石</Hightlight>
    产量均在全国前三位。抗战时期把四川省（当时包括重庆）作为抗战大后方，一方面是易守难攻，
    另一方面是四川的资源禀赋还可以，粮食可以自给自足，建国前四川就有5000万人口，占中国10%，在20世纪几乎一直是中国人口第一大省，一直到1997年重庆
    <Hightlight color={markColor}>三千万人</Hightlight>
    被分出去才失去这一地位，可以说四川作为中国人口大省的地位几乎贯穿了整个20世纪。
  </DempP>
)

const P3 = (markColor: TColorName): ReactNode => (
  <DempP>
    其他全国所有的省份，没有一个人均产量超过700公斤的，其中2021年
    <Hightlight color={markColor}>新疆，安徽，河南三省</Hightlight>
    人均都是600多公斤，辽宁省人均刚好600公斤，这四个省份也是最接近
    黑吉蒙的，但是可以看出人均也只有黑吉蒙的一半都不到。
    {/* <Br /> */}
    <p>
      我们再说四川省，四川省 一直被认为是中国的
      <Hightlight color={markColor}>战略备份省份</Hightlight>
      ，除了地势易守难攻，地理位置远离强敌之外，四川省在资源禀赋方面也是有自己的优势的。
    </p>
  </DempP>
)

const UsersWall: FC = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const users = mockUsers(10)

  return (
    <Wrapper>
      <Slogan>
        <Title>被众多优秀开发者和团队青睐</Title>
        <Desc>从独立开发者到中小型创业团队，我们用产品力回报信任</Desc>
      </Slogan>

      {loaded && (
        <Parallax speed={-20} scale={[3, 0.8]} opacity={[1, 0.8]}>
          <BgGradient />
        </Parallax>
      )}

      <Wall>
        <MasonryCards column={3}>
          <Card content={P1(COLOR_NAME.BLUE)} user={users[0]} color={COLOR_NAME.BLUE} />
          <Card content={P2(COLOR_NAME.ORANGE)} user={users[1]} color={COLOR_NAME.ORANGE} />
          <Card content={P1(COLOR_NAME.RED)} user={users[2]} color={COLOR_NAME.RED} />
          <Card content={P1(COLOR_NAME.GREEN)} user={users[3]} color={COLOR_NAME.GREEN} />
          <Card content={P3(COLOR_NAME.CYAN)} user={users[4]} color={COLOR_NAME.CYAN} />
          <Card content={P1(COLOR_NAME.PURPLE)} user={users[5]} color={COLOR_NAME.PURPLE} />
          <Card content={P2(COLOR_NAME.YELLOW)} user={users[6]} color={COLOR_NAME.YELLOW} />
          <Card content={P1(COLOR_NAME.BLUE)} user={users[7]} color={COLOR_NAME.BLUE} />
          <Card content={P1(COLOR_NAME.BROWN)} user={users[8]} color={COLOR_NAME.BROWN} />
        </MasonryCards>
      </Wall>
    </Wrapper>
  )
}

export default UsersWall
