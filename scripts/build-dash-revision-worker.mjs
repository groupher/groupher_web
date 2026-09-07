import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'vite'

import { writeFileIfChanged } from './sync-files.mjs'

const __filename = fileURLToPath(import.meta.url)
const repoRoot = path.resolve(path.dirname(__filename), '..')
const configFile = path.join(repoRoot, 'frontend/dash/vite.worker.config.mts')
const outputDir = path.join(repoRoot, 'frontend/dash/public')

const result = await build({
  configFile,
  build: {
    write: false,
  },
})
const builds = Array.isArray(result) ? result : [result]
const outputs = builds.flatMap((entry) => entry.output)

if (outputs.length === 0) {
  throw new Error('Revision worker build emitted no output')
}

let changedCount = 0
for (const output of outputs) {
  const content = output.type === 'asset' ? output.source : output.code
  if (writeFileIfChanged(path.join(outputDir, output.fileName), content)) changedCount += 1
}

console.log(
  `[build-dash-revision-worker] emitted ${outputs.length} file(s), rewrote ${changedCount}`,
)
