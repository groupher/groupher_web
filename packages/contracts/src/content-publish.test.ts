import { describe, expect, it } from 'vitest'

import {
  CONTENT_PUBLISH_ACTION,
  CONTENT_PUBLISH_SCOPE,
  CONTENT_SCOPE_BY_ACTION,
  CONTENT_SOURCE_FORMAT,
  CONTENT_TYPE,
  CONTENT_TYPE_BY_ACTION,
  parseContentPublishCommand,
} from './content-publish'

const docCommand = {
  action: CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT,
  target: { community: 'home', documentId: 'doc-1' },
  payload: {
    content: { format: CONTENT_SOURCE_FORMAT.PLATE, value: [{ type: 'p', children: [] }] },
    title: 'Intro',
    subtitle: '',
    slug: 'intro',
  },
  commandId: 'command-1',
  expectedVersion: 3,
}

describe('content publish command parser', () => {
  it('parses an action-specific doc command', () => {
    expect(parseContentPublishCommand(docCommand)).toEqual({ ok: true, value: docCommand })
  })

  it.each([
    [{ ...docCommand, action: 'doc.delete' }, 'action', 'unknown_action'],
    [{ ...docCommand, expectedVersion: -1 }, 'expectedVersion', 'invalid_version'],
    [
      { ...docCommand, payload: { ...docCommand.payload, content: { format: 'html' } } },
      'payload.content.format',
      'unknown_format',
    ],
    [{ ...docCommand, target: { articleId: 'article-1' } }, 'target.community', 'invalid_string'],
  ])('fails closed for invalid commands', (command, path, code) => {
    expect(parseContentPublishCommand(command)).toMatchObject({
      ok: false,
      issues: [{ path, code }],
    })
  })

  it('maps every action to a content type and capability scope', () => {
    expect(Object.keys(CONTENT_TYPE_BY_ACTION)).toEqual(Object.values(CONTENT_PUBLISH_ACTION))
    expect(CONTENT_TYPE_BY_ACTION[CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT]).toBe(CONTENT_TYPE.DOC)
    expect(CONTENT_SCOPE_BY_ACTION[CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT]).toBe(
      CONTENT_PUBLISH_SCOPE.DOC_WRITE,
    )
  })
})
