import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import FaqList from '@/widgets/FaqList'

import Category from './Category'
import { Wrapper, CatsWrapper, FAQWrapper } from './styles/full_layout'

type TProps = {
  testid?: string
}

const FullLayout: FC<TProps> = ({ testid = 'FullLayout' }) => {
  return (
    <Wrapper>
      <CatsWrapper>
        <Category color={COLOR_NAME.ORANGE} title="Get Started" desc="Get Started" />
        <Category color={COLOR_NAME.RED} title="CI/CD and DevOps" desc="CI/CD and DevOps" />
        <Category
          color={COLOR_NAME.BLUE}
          title="Collaborative Coding"
          desc="Collaborative Coding"
        />
        <Category color={COLOR_NAME.GREEN} title="Developers" desc="Collaborative Coding" />
        <Category
          color={COLOR_NAME.PURPLE}
          title="Enterprise and Teams"
          desc="Enterprise and Teams"
        />
        <Category color={COLOR_NAME.CYAN} title="CI/CD and DevOps" desc="CI/CD and DevOps" />
        <Category
          color={COLOR_NAME.PINK}
          title="Collaborative Coding"
          desc="Collaborative Coding"
        />
        <Category color={COLOR_NAME.YELLOW} title="Developers" desc="Collaborative Coding" />
        <Category
          color={COLOR_NAME.BLACK}
          title="Enterprise and Teams"
          desc="Enterprise and Teams"
        />
      </CatsWrapper>

      <FAQWrapper>
        <FaqList />
      </FAQWrapper>
    </Wrapper>
  )
}

export default memo(FullLayout)
