import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant'

import Category from './Category'
import { Wrapper, CatsWrapper } from './styles/helpcenter_layout'

type TProps = {
  testid?: string
}

const HelpCenterLayout: FC<TProps> = ({ testid = 'FaqLayout' }) => {
  return (
    <Wrapper>
      <CatsWrapper>
        <Category color={COLOR_NAME.ORANGE} title="Get Started" desc="Get Started" column={3} />
        <Category
          color={COLOR_NAME.RED}
          title="CI/CD and DevOps"
          desc="CI/CD and DevOps"
          column={3}
        />
        <Category
          color={COLOR_NAME.BLUE}
          title="Collaborative Coding"
          desc="Collaborative Coding"
          column={3}
        />
        <Category
          color={COLOR_NAME.GREEN}
          title="Developers"
          desc="Collaborative Coding"
          column={3}
        />
        <Category
          color={COLOR_NAME.PURPLE}
          title="Enterprise and Teams"
          desc="Enterprise and Teams"
          column={3}
        />
        <Category
          color={COLOR_NAME.RED}
          title="CI/CD and DevOps"
          desc="CI/CD and DevOps"
          column={3}
        />
        <Category
          color={COLOR_NAME.BLUE}
          title="Collaborative Coding"
          desc="Collaborative Coding"
          column={3}
        />
        <Category
          color={COLOR_NAME.GREEN}
          title="Developers"
          desc="Collaborative Coding"
          column={3}
        />
        <Category
          color={COLOR_NAME.BLACK}
          title="Enterprise and Teams"
          desc="Enterprise and Teams"
          column={3}
        />
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(HelpCenterLayout)
