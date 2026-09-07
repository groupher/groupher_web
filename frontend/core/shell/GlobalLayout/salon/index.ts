export default function useSalon() {
  /**
 * see layout details:
 " @link https://css-tricks.com/the-fixed-background-attachment-hack/
 */
  return {
    wrapper: 'row justify-center',
    scrollWrapper: 'absolute z-10 w-full',
    skeleton: 'relative isolate s-screen antialiased',
  }
}
