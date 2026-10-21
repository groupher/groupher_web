/** Shared semantic tokens; this form has no appearance-specific pagination styling. */
export default function useSalon() {
  return {
    wrapper: 'flex flex-col gap-5 py-6',
    options: 'flex flex-col gap-4',
    title: 'text-title text-base font-medium',
    hint: 'text-digest text-sm',
    option: 'flex items-center gap-3 text-title',
    save: 'w-fit rounded-lg border border-digest px-4 py-2 text-title disabled:opacity-50',
  }
}
