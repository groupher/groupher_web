export type TDocBranchRevisionAuthor = {
  login?: string | null
  nickname?: string | null
  avatar?: string | null
}

export type TDocBranchRevision = {
  id: string
  branchVersionId: string
  title?: string | null
  subtitle?: string | null
  body?: { json?: string | null } | null
  revisionNumber?: number | null
  insertedAt?: string | null
  author?: TDocBranchRevisionAuthor | null
}

export type TDocBranchVersionWire = {
  id: string
  revisionId: string
  versionNumber: number
  publishedAt?: string | null
  message?: string | null
  content: {
    title?: string | null
    slug?: string | null
    subtitle?: string | null
    digest?: string | null
    body?: { json?: string | null } | null
    bodyHash?: string | null
    schemaVersion?: number | null
  }
}

export type TDocBranchVersionsPayload = {
  docBranchVersions?: import('~/spec').TPagiPage<TDocBranchVersionWire> | null
}
