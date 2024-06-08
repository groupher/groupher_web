import { type FC, memo } from 'react'

// import { Wrapper } from './styles'
import { Title } from './styles/header'

type TProps = {
  type: string
}

const GraphQLTitle: FC<TProps> = ({ type }) => {
  switch (type) {
    case 'changeset':
      return <Title>请求错误 (ChangeSet)</Title>
    case 'parse':
      return <Title>请求错误 (GraphQL解析错误)</Title>
    case 'custom':
      return <Title>请求错误 (参数错误)</Title>

    default:
      return <div>GraphQLTitle</div>
  }
}

export default memo(GraphQLTitle)
