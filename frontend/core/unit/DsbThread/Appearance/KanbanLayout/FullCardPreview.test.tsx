import { render } from '@testing-library/react'

import FullCardPreview from './FullCardPreview'

vi.mock('~/icons/Comment', () => ({
  default: ({ className }: { className?: string }) => <svg className={className} />,
}))

vi.mock('~/icons/Upvote', () => ({
  default: ({ className }: { className?: string }) => <svg className={className} />,
}))

vi.mock('./salon/item_card_layout', () => ({
  default: () => ({
    fullBlock: 'full-block',
    fullBlockActive: 'full-block-active',
    frame: 'frame',
    header: 'header',
    headerRow: 'header-row',
    footer: 'footer',
    footerLeft: 'footer-left',
    footerRight: 'footer-right',
    barBase: 'bar-base',
    titleBar: 'title-bar',
    bodyBar: 'body-bar',
    sideBar: 'side-bar',
    tinyMetric: 'tiny-metric',
    icon: 'icon',
    commentIcon: 'comment-icon',
    avatarList: 'avatar-list',
    userAvatar: 'user-avatar',
  }),
}))

describe('<FullCardPreview />', () => {
  it('expresses active state through data-state', () => {
    const { container } = render(<FullCardPreview isActive />)

    expect(container.firstElementChild).toHaveAttribute('data-state', 'active')
  })

  it('expresses idle state through data-state', () => {
    const { container } = render(<FullCardPreview isActive={false} />)

    expect(container.firstElementChild).toHaveAttribute('data-state', 'idle')
  })
})
