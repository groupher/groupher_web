import { useEffect, useState } from 'react'

import { normalizeSignedAngle } from '~/lib/angle'
import AngleField from '~/ui/TuningFields/AngleField'

import useLogic from '../../useLogic'

type TProps = {
  angle: number
}

export default function AnglePanel({ angle }: TProps) {
  const { changeAngle, flushWallpaperDraft } = useLogic()
  const [angleDraft, setAngleDraft] = useState(() => normalizeSignedAngle(angle))

  useEffect(() => {
    setAngleDraft(normalizeSignedAngle(angle))
  }, [angle])

  const handleChange = (nextAngle: number): void => {
    setAngleDraft(nextAngle)
    changeAngle(nextAngle)
  }

  return <AngleField value={angleDraft} onChange={handleChange} onCommit={flushWallpaperDraft} />
}
