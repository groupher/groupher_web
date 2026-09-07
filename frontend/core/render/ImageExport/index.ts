export type * from './spec'

/** Computes the browser SHA-256 checksum used by upload intent/finalize. */
export const checksumImageFile = async (file: File): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer())
  let binary = ''

  for (const byte of new Uint8Array(digest)) binary += String.fromCharCode(byte)

  return btoa(binary)
}
