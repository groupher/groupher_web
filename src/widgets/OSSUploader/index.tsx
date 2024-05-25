/* eslint-disable jsx-a11y/label-has-for */
/*
 * OSSUploader
 */
import Script from 'next/script'

import { type FC, memo, type ReactNode, useState, useEffect, useRef, useCallback } from 'react'

import { buildLog } from '@/logger'
import uid from '@/utils/uid'
import { assetPath } from '@/helper'

import {
  Wrapper,
  InnerWrapper,
  Label,
  HintIcon,
  TurboIcon,
  InputFile,
  CloseBtn,
  CrossIcon,
} from './styles'
import PreviewBlock from './PreviewBlock'
import { initOSSClient, handleUploadFile, applyUploadTokensIfNeed } from './helper'

const log = buildLog('w:OSSUploader:index')

type TProps = {
  children: ReactNode
  onUploadDone?: (url: string) => void
  onDelete?: () => void
  filePrefix?: string | null
  fileType?: string
  previewUrl?: string
  previewHeight?: number
  previewWidth?: number
  previewRadius?: number
}

const OSSUploader: FC<TProps> = ({
  children,
  fileType = 'image/*',
  filePrefix = null,
  onUploadDone = log,
  onDelete = log,
  previewUrl = '', // 'https://static.groupher.com/ugc/_tmp/2023-10-13/Linth.png',
  previewHeight = 50,
  previewWidth = 50,
  previewRadius = 4,
}) => {
  const [loaded, setOnLoad] = useState(false)
  const [uniqueId, setUniqueId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ossClient, setOSSClient] = useState(null)

  const labelRef = useRef(null)

  useEffect(() => {
    if (loaded) {
      // see https://stackoverflow.com/a/53572588
      // eslint-disable-next-line no-inner-declarations
      async function initOSS() {
        await applyUploadTokensIfNeed()
        const ossClient = initOSSClient()

        setOSSClient(ossClient)
        setUniqueId(uid.gen())
      }

      initOSS()
    }
  }, [loaded])

  const onStart = useCallback(() => {
    setLoading(true)
  }, [])

  const onDone = useCallback(
    (url) => {
      setLoading(false)
      // console.log('## url: ', url)
      // console.log('## asset url: ', assetPath(url))
      onUploadDone(assetPath(url))
    },
    [onUploadDone],
  )

  const onError = useCallback((msg) => {
    setLoading(false)
  }, [])

  const callbacks = { onStart, onDone, onError }
  const showPreview = !!previewUrl

  return (
    <Wrapper>
      <Script
        src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.1.min.js"
        onLoad={() => setOnLoad(true)}
      />

      {showPreview && (
        <CloseBtn onClick={onDelete}>
          <CrossIcon />
        </CloseBtn>
      )}

      <InnerWrapper>
        <InputFile
          id={`file-${uniqueId}`}
          type="file"
          name={`file-${uniqueId}`}
          accept={fileType}
          onChange={(e) => handleUploadFile(ossClient, e, filePrefix, callbacks)}
        />
        <Label htmlFor={`file-${uniqueId}`} ref={labelRef} $loading={loading}>
          <>
            {showPreview ? (
              <PreviewBlock
                url={previewUrl}
                height={previewHeight}
                width={previewWidth}
                radius={previewRadius}
              />
            ) : (
              <>{children}</>
            )}
          </>
        </Label>

        {!loading && <HintIcon onClick={() => labelRef.current.click()} />}
        {loading && <TurboIcon />}
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(OSSUploader)
