import styled, { css, theme } from '~/css'
import type { TColorName, TTestable } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  color: TColorName | null
}

export default ({ color }: TProps) => {
  const { cn, fg, br, rainbowLight } = useTwBelt()

  return {
    wrapper: cn('border-b pt-3.5 pb-4 mb-4 -mt-1.5', br('divider')),
    header: 'row-center mb-1.5 w-full',
    tagWrapper: cn('row-align-both -ml-0.5 pl-2 pr-3 rounded-lg h-7', rainbowLight(color)),
    title: cn('z-2', fg('text.title')),
  }
}

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.rowWrap('justify-between')};

  border-bottom: 1px solid;
  border-color: ${theme('divider')};
  padding: 20px 0;
  padding-top: 15px;
  margin-bottom: 25px;
  margin-top: -8px;
`
