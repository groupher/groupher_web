import { FC } from 'react'

import { isEmpty } from 'ramda'

import { SITE_URL, BEIAN_ADDR, BEIAN_TEXT } from '@/config'
import { Wrapper, Note, Addr } from '../styles/desktop_view/simple_layout'

const SimpleLayout: FC = () => {
  return (
    <Wrapper testid="footer">
      <Note>
        由<Addr href={SITE_URL}>Groupher</Addr>
        提供服务
      </Note>
      {!isEmpty(BEIAN_TEXT) && (
        <Note>
          <Addr href={BEIAN_ADDR} target="_blank" prefetch={false}>
            {BEIAN_TEXT}
          </Addr>
        </Note>
      )}
    </Wrapper>
  )
}

export default SimpleLayout
