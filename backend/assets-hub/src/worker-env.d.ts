/**
 * Declares the Cloudflare bindings consumed by the Assets Hub Worker.
 *
 * Business position:
 *
 *   Worker deployment configuration
 *     -> Env bindings
 *     -> Assets Hub routes and queue consumer
 *     -> R2 / Phoenix service boundary
 */

type R2ObjectBody = {
  body: ReadableStream
  httpEtag?: string
  httpMetadata?: {
    contentType?: string
  }
  size?: number
}

type R2Object = {
  checksums: {
    sha256?: ArrayBuffer
  }
  httpMetadata?: {
    contentType?: string
  }
  size: number
}

type R2Bucket = {
  delete(keys: string | string[]): Promise<void>
  get(key: string): Promise<R2ObjectBody | null>
  head(key: string): Promise<R2Object | null>
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | string,
    options?: { httpMetadata?: { contentType?: string }; sha256?: ArrayBuffer | ArrayBufferView },
  ): Promise<R2Object>
}

type Queue<Body = unknown> = {
  send(body: Body): Promise<void>
}

type Message<Body = unknown> = {
  body: Body
}

type MessageBatch<Body = unknown> = {
  messages: Message<Body>[]
}

interface Env {
  ASSET_DELETE_QUEUE: Queue
  ASSETS_BUCKET: R2Bucket
  ASSETS_HUB_CAPABILITY_SECRET?: string
  GENERATED_IMAGE_BATCHES: DurableObjectNamespace<
    import('./generated-batch-do').GeneratedImageBatchDO
  >
  ASSETS_HUB_BATCH_POLICY_VERSION?: string
  ASSETS_HUB_BATCH_SIGNING_KEY_ID?: string
  ASSETS_PUBLIC_ENDPOINT?: string
  ENVIRONMENT?: string
  PHOENIX_GRAPHQL_ENDPOINT?: string
  SERVICE_AUTH_CLIENT_ID?: string
  SERVICE_AUTH_CLIENT_SECRET?: string
  SERVICE_AUTH_ISSUER?: string
  SERVICE_AUTH_JWKS_URL?: string
  SERVICE_AUTH_TOKEN_ENDPOINT?: string
  VERSION?: string
}
