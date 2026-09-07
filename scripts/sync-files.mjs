import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'

const toBuffer = (content) => (Buffer.isBuffer(content) ? content : Buffer.from(content))

/** Write a generated file without invalidating file watchers when its bytes are unchanged. */
export const writeFileIfChanged = (target, content) => {
  const next = toBuffer(content)

  if (existsSync(target)) {
    if (lstatSync(target).isFile()) {
      const current = readFileSync(target)
      if (current.equals(next)) return false
    } else {
      rmSync(target, { recursive: true, force: true })
    }
  }

  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, next)
  return true
}

/**
 * Mirror one generated asset directory while preserving unchanged target files.
 * Hidden source entries are intentionally excluded to match the asset sync contract.
 */
export const syncDirectory = (source, target, filter = () => true) => {
  if (existsSync(target) && !lstatSync(target).isDirectory()) {
    rmSync(target, { recursive: true, force: true })
  }
  mkdirSync(target, { recursive: true })

  const sourceEntries = readdirSync(source, { withFileTypes: true }).filter(
    (entry) => !entry.name.startsWith('.') && filter(entry),
  )
  const expectedNames = new Set(sourceEntries.map((entry) => entry.name))

  for (const targetEntry of readdirSync(target, { withFileTypes: true })) {
    if (expectedNames.has(targetEntry.name)) continue
    rmSync(path.join(target, targetEntry.name), { recursive: true, force: true })
  }

  for (const entry of sourceEntries) {
    const sourcePath = path.join(source, entry.name)
    const targetPath = path.join(target, entry.name)

    if (entry.isDirectory()) {
      syncDirectory(sourcePath, targetPath)
      continue
    }

    if (!entry.isFile()) {
      throw new Error(`Unsupported generated asset entry: ${sourcePath}`)
    }

    writeFileIfChanged(targetPath, readFileSync(sourcePath))
  }
}
