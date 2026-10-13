/**
 * Implements the filesystem-backed object adapter for local Assets Hub development.
 *
 * Local provider
 *   -> upload intent / temporary PUT
 *   -> local object bytes
 *   -> R2-compatible head, read, and delete behavior
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { TUploadCapability } from './capability'

export type TLocalObjectHead = {
  ContentLength: number
  ContentType: string
  ChecksumSHA256: string
  ETag: string
}

type TLocalUpload = {
  contentType: string
  expiresAt: string
  objectKey: string
  sizeBytes: number
  uploadRef: string
}

const sha256Base64 = (buffer: Buffer) => createHash('sha256').update(buffer).digest('base64')

/** Stores the provider's physical bytes locally while preserving the R2 contract. */
export class LocalObjectStore {
  readonly root: string

  constructor(root = path.resolve(process.cwd(), '.local/assets-hub')) {
    this.root = path.resolve(root)
  }

  async createUpload(capability: TUploadCapability): Promise<void> {
    await mkdir(this.uploadsRoot(), { recursive: true })
    await writeFile(
      this.uploadMetadataPath(capability.uploadRef),
      JSON.stringify({
        contentType: capability.declaredMimeType,
        expiresAt: capability.expiresAt,
        objectKey: capability.objectKey,
        sizeBytes: capability.declaredSizeBytes,
        uploadRef: capability.uploadRef,
      } satisfies TLocalUpload),
      'utf8',
    )
  }

  async putUpload(uploadRef: string, body: Buffer, contentType: string): Promise<TLocalObjectHead> {
    const upload = await this.readUpload(uploadRef)
    if (!upload) throw new Error('Upload intent was not found')
    if (Date.parse(upload.expiresAt) <= Date.now()) throw new Error('Upload intent expired')
    if (contentType !== upload.contentType)
      throw new Error('Uploaded object content type does not match capability')
    if (body.byteLength !== upload.sizeBytes)
      throw new Error('Uploaded object size does not match capability')

    const objectPath = this.objectPath(upload.objectKey)
    await mkdir(path.dirname(objectPath), { recursive: true })
    await writeFile(objectPath, body)
    await writeFile(
      `${objectPath}.meta.json`,
      JSON.stringify({ contentType: upload.contentType }),
      'utf8',
    )
    return this.headFromBuffer(body, contentType)
  }

  async headObject(objectKey: string): Promise<TLocalObjectHead | null> {
    try {
      const object = await readFile(this.objectPath(objectKey))
      const metadata = await this.readObjectMetadata(objectKey)
      return this.headFromBuffer(object, metadata?.contentType || 'application/octet-stream')
    } catch (error) {
      if (this.isMissing(error)) return null
      throw error
    }
  }

  async getObjectBytes(objectKey: string): Promise<Buffer> {
    return readFile(this.objectPath(objectKey))
  }

  async deleteObject(objectKey: string): Promise<void> {
    try {
      await unlink(this.objectPath(objectKey))
    } catch (error) {
      if (!this.isMissing(error)) throw error
    }
    try {
      await unlink(`${this.objectPath(objectKey)}.meta.json`)
    } catch (error) {
      if (!this.isMissing(error)) throw error
    }
  }

  async deleteObjects(objectKeys: string[]): Promise<void> {
    await Promise.all([...new Set(objectKeys)].map((objectKey) => this.deleteObject(objectKey)))
  }

  async objectExists(objectKey: string): Promise<boolean> {
    try {
      await stat(this.objectPath(objectKey))
      return true
    } catch (error) {
      if (this.isMissing(error)) return false
      throw error
    }
  }

  uploadUrl(uploadRef: string, requestUrl: string): string {
    const url = new URL(`/local/uploads/${encodeURIComponent(uploadRef)}`, requestUrl)
    return url.toString()
  }

  private async readUpload(uploadRef: string): Promise<TLocalUpload | null> {
    try {
      const raw = await readFile(this.uploadMetadataPath(uploadRef), 'utf8')
      return JSON.parse(raw) as TLocalUpload
    } catch (error) {
      if (this.isMissing(error)) return null
      throw error
    }
  }

  private async readObjectMetadata(objectKey: string): Promise<{ contentType?: string } | null> {
    try {
      const raw = await readFile(`${this.objectPath(objectKey)}.meta.json`, 'utf8')
      return JSON.parse(raw) as { contentType?: string }
    } catch (error) {
      if (this.isMissing(error)) return null
      throw error
    }
  }

  private headFromBuffer(buffer: Buffer, contentType: string): TLocalObjectHead {
    const checksum = sha256Base64(buffer)
    return {
      ChecksumSHA256: checksum,
      ContentLength: buffer.byteLength,
      ContentType: contentType,
      ETag: `"${createHash('md5').update(buffer).digest('hex')}"`,
    }
  }

  private objectPath(objectKey: string): string {
    return this.safePath(path.join(this.objectsRoot(), objectKey))
  }

  private uploadMetadataPath(uploadRef: string): string {
    return this.safePath(path.join(this.uploadsRoot(), `${encodeURIComponent(uploadRef)}.json`))
  }

  private objectsRoot(): string {
    return path.join(this.root, 'objects')
  }

  private uploadsRoot(): string {
    return path.join(this.root, 'uploads')
  }

  private safePath(candidate: string): string {
    const resolved = path.resolve(candidate)
    const root = path.resolve(this.root)
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
      throw new Error('Local asset path escapes provider root')
    }
    return resolved
  }

  private isMissing(error: unknown): boolean {
    return Boolean(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')
  }
}
