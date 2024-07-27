import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, primary } = useTwBelt()

  return {
    wrapper: 'px-2.5 py-2',
    iconBox: 'row-align-both size-5 mr-1',
    checked: cn('size-4', primary('fill')),
  }
}

// export const Wrapper = styled.div`
//   padding: 10px 8px;
//   animation: ${animate.fadeInBounce} 0.4s linear;
// `
