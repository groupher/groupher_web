import assert from 'node:assert/strict'
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { syncDirectory, writeFileIfChanged } from './sync-files.mjs'

test('writeFileIfChanged preserves an unchanged file timestamp', (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'groupher-sync-file-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const target = path.join(root, 'asset.svg')
  const oldTime = new Date('2020-01-01T00:00:00.000Z')

  writeFileSync(target, '<svg />')
  utimesSync(target, oldTime, oldTime)

  assert.equal(writeFileIfChanged(target, '<svg />'), false)
  assert.equal(statSync(target).mtimeMs, oldTime.getTime())
  assert.equal(writeFileIfChanged(target, '<svg>changed</svg>'), true)
  assert.equal(readFileSync(target, 'utf8'), '<svg>changed</svg>')
})

test('syncDirectory mirrors stale and changed files without rewriting unchanged files', (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'groupher-sync-dir-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = path.join(root, 'source')
  const target = path.join(root, 'target')
  const oldTime = new Date('2020-01-01T00:00:00.000Z')

  mkdirSync(path.join(source, 'nested'), { recursive: true })
  mkdirSync(path.join(target, 'nested'), { recursive: true })
  writeFileSync(path.join(source, 'same.svg'), 'same')
  writeFileSync(path.join(source, 'changed.svg'), 'next')
  writeFileSync(path.join(source, 'nested/child.svg'), 'child')
  mkdirSync(path.join(source, 'was-directory'))
  writeFileSync(path.join(source, 'was-directory/child.svg'), 'child')
  writeFileSync(path.join(source, 'was-file.svg'), 'file')
  writeFileSync(path.join(source, '.ignored'), 'ignored')
  writeFileSync(path.join(target, 'same.svg'), 'same')
  writeFileSync(path.join(target, 'changed.svg'), 'previous')
  writeFileSync(path.join(target, 'stale.svg'), 'stale')
  writeFileSync(path.join(target, 'was-directory'), 'previous file')
  mkdirSync(path.join(target, 'was-file.svg'))
  writeFileSync(path.join(target, '.stale'), 'stale')
  utimesSync(path.join(target, 'same.svg'), oldTime, oldTime)

  syncDirectory(source, target)

  assert.equal(statSync(path.join(target, 'same.svg')).mtimeMs, oldTime.getTime())
  assert.equal(readFileSync(path.join(target, 'changed.svg'), 'utf8'), 'next')
  assert.equal(readFileSync(path.join(target, 'nested/child.svg'), 'utf8'), 'child')
  assert.equal(readFileSync(path.join(target, 'was-directory/child.svg'), 'utf8'), 'child')
  assert.equal(readFileSync(path.join(target, 'was-file.svg'), 'utf8'), 'file')
  assert.equal(existsSync(path.join(target, 'stale.svg')), false)
  assert.equal(existsSync(path.join(target, '.stale')), false)
  assert.equal(existsSync(path.join(target, '.ignored')), false)
})
