import { Wrapper, UploadIcon, Title, Desc } from './styles/cover'

const Cover = () => {
  return (
    <Wrapper>
      <UploadIcon />
      <Title>上传封面图</Title>
      <Desc>上传本地图片或 URL, 默认展示为 680x400 宽度</Desc>
    </Wrapper>
  )
}

export default Cover
