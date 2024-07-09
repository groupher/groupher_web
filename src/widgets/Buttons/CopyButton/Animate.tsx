import { type FC, memo, useEffect, useState } from 'react'

import { CopyedHint, CopyIcon, CopyedText } from '../styles/copy_button'

const CopyButton: FC = () => {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) setTimeout(() => setDone(false), 3000)
  }, [done])

  return (
    <div>
      {!done && <CopyIcon onClick={() => setDone(true)} />}
      {done && (
        <CopyedHint>
          <CopyedText>已复制</CopyedText>
        </CopyedHint>
      )}
    </div>
  )
}

export default memo(CopyButton)
