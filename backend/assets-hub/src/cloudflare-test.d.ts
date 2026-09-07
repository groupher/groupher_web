/**
 * Extends Cloudflare's test runtime environment with Assets Hub bindings.
 *
 * Worker test config
 *   -> Cloudflare test Env
 *   -> R2 / Queue / Durable Object bindings
 */
declare module 'cloudflare:test' {
  interface ProvidedEnv {
    ASSET_DELETE_QUEUE: Queue
    ASSETS_BUCKET: R2Bucket
    GENERATED_IMAGE_BATCHES: DurableObjectNamespace<
      import('./generated-batch-do').GeneratedImageBatchDO
    >
  }
}

export {}

declare global {
  namespace Cloudflare {
    interface Env {
      ASSET_DELETE_QUEUE: Queue
      ASSETS_BUCKET: R2Bucket
      GENERATED_IMAGE_BATCHES: DurableObjectNamespace<
        import('./generated-batch-do').GeneratedImageBatchDO
      >
    }
  }
}
