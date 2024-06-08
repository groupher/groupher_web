/* eslint-disable react/no-array-index-key */

import { type FC, memo, Fragment } from 'react'

import { Wrapper, Title, Reason, Content, IllegalItem } from './styles'

type TProps = {
  illegalReason: string[]
  illegalWords: string[]
}

const IllegalWarning: FC<TProps> = ({ illegalReason, illegalWords }) => {
  return (
    <Wrapper>
      <Title>
        包含 [
        {illegalReason.map((reason, index) => (
          <Fragment key={reason}>
            <Reason>{reason}</Reason>
            {index !== illegalReason.length - 1 && <>|</>}
          </Fragment>
        ))}
        ] 内容:
      </Title>

      <Content>
        {illegalWords.map((word) => (
          <IllegalItem key={word}>{word}</IllegalItem>
        ))}
      </Content>
    </Wrapper>
  )
}

export default memo(IllegalWarning)
