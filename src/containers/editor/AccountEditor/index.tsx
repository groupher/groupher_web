/*
 *
 * AccountEditor
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'
import { closeDrawer } from '@/signal'

import SubmitButton from '@/widgets/Buttons/SubmitButton'
import Tooltip from '@/widgets/Tooltip'
import { Divider, SpaceGrow, Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'

import SexInputer from './SexInputer'
import SocialInputer from './SocialInputer'

import { useStore } from './store'

import {
  Wrapper,
  AvatarPic,
  FormsWrapper,
  Section,
  RowSection,
  LoginSection,
  LoginDesc,
  GithubIcon,
  Label,
  SexLabel,
  Input,
  TextareaInput,
  Footer,
} from './styles'

import { useInit, inputOnChange, onUpdate } from './logic'

const log = buildLog('C:AccountEditor')

const AccountEditor: FC = () => {
  const store = useStore()
  useInit(store)

  const { login, fromGithub, submitState, editData } = store
  const { profile } = editData

  return (
    <Wrapper className="normal-form">
      <OSSUploader onUploadDone={(url) => inputOnChange(url, 'avatar')}>
        {profile.avatar && <AvatarPic src={profile.avatar} />}
      </OSSUploader>

      <Br bottom={50} />

      <FormsWrapper>
        <LoginSection>
          <Label>登入名称</Label>
          <LoginDesc>{login}</LoginDesc>
          <SpaceGrow />
          {fromGithub && (
            <Tooltip content="使用 Github 登入" placement="bottom-end">
              <GithubIcon />
            </Tooltip>
          )}
        </LoginSection>
        <Section>
          <Label>我的昵称</Label>
          <Input
            value={profile.nickname}
            placeholder="// 我的昵称"
            onChange={(e) => inputOnChange(e, 'nickname')}
          />
        </Section>

        <Section>
          <Label>一句话介绍</Label>
          <Input
            value={profile.shortbio}
            placeholder="// 示例：工作@团队"
            onChange={(e) => inputOnChange(e, 'shortbio')}
          />
        </Section>

        <RowSection>
          <SexLabel>性别</SexLabel>
          <SexInputer value={profile.sex} />
        </RowSection>

        <Section>
          <Label>关于我</Label>
          <TextareaInput
            value={profile.bio}
            placeholder="// 更多介绍"
            behavior="textarea"
            onChange={(e) => inputOnChange(e, 'bio')}
          />
        </Section>
        <Divider top={0} bottom={30} />
        <SocialInputer editData={editData} />
        <Divider bottom={30} />
        <Footer>
          <SubmitButton
            submitState={submitState}
            okText="更 新"
            onPublish={onUpdate}
            onCancel={closeDrawer}
            withCancel
          />
        </Footer>
      </FormsWrapper>
    </Wrapper>
  )
}

export default observer(AccountEditor)
