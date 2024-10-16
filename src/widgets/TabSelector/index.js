/*
 *
 * TabSelector
 *
 */

import React from 'react'
import T from 'prop-types'

import { Wrapper, OptionsWrapper, Option, Icon, Title, HeaderDivider } from './styles'

const TabSelector = ({ source, activeRaw, onChange }) => (
  <Wrapper>
    <OptionsWrapper>
      {source.map((opt) => (
        <Option key={opt.slug} active={activeRaw === opt.slug} onClick={() => onChange(opt)}>
          <Icon src={opt.icon} active={activeRaw === opt.slug} />
          <Title>
            {opt.title}
            {opt.count > 0 && <span>({opt.count})</span>}
          </Title>
        </Option>
      ))}
    </OptionsWrapper>
    <HeaderDivider />
  </Wrapper>
)

TabSelector.propTypes = {
  onChange: T.func,
  activeRaw: T.string.isRequired,
  source: T.arrayOf(
    T.shape({
      title: T.string.isRequired,
      icon: T.string.isRequired,
      slug: T.string.isRequired,
      count: T.number,
    }),
  ).isRequired,
}

TabSelector.defaultProps = {
  onChange: log,
}

export default React.memo(TabSelector)
