import type { TServiceRelation } from '@shared/contracts'
import { useMemo } from 'react'

import type { TFlowLayout } from '@/components/flow-spec'

const EDGE_LANE_GAP = 34

export function useFlowRelations(layout: TFlowLayout | null, relations: TServiceRelation[]) {
  const relationIdsByService = useMemo(() => {
    const incoming = new Map<string, string[]>()
    const outgoing = new Map<string, string[]>()

    for (const relation of relations) {
      incoming.set(relation.target, [...(incoming.get(relation.target) || []), relation.id])
      outgoing.set(relation.source, [...(outgoing.get(relation.source) || []), relation.id])
    }

    if (layout) {
      const relationById = new Map(relations.map((relation) => [relation.id, relation]))
      const sortByConnectedX = (
        relationIds: string[],
        getConnectedServiceId: (relation: TServiceRelation) => string,
      ) => {
        relationIds.sort((leftId, rightId) => {
          const leftRelation = relationById.get(leftId)
          const rightRelation = relationById.get(rightId)
          if (!leftRelation || !rightRelation) return leftId.localeCompare(rightId)

          const leftX = layout.positions[getConnectedServiceId(leftRelation)]?.x || 0
          const rightX = layout.positions[getConnectedServiceId(rightRelation)]?.x || 0
          return leftX - rightX || leftId.localeCompare(rightId)
        })
      }

      for (const relationIds of incoming.values()) {
        sortByConnectedX(relationIds, (relation) => relation.source)
      }
      for (const relationIds of outgoing.values()) {
        sortByConnectedX(relationIds, (relation) => relation.target)
      }
    }

    return { incoming, outgoing }
  }, [layout, relations])

  const laneOffsetByRelation = useMemo(() => {
    const offsets = new Map<string, number>()
    if (!layout) return offsets

    const relationById = new Map(relations.map((relation) => [relation.id, relation]))
    const assignLanes = (
      anchorServiceId: string,
      relationIds: string[],
      getConnectedServiceId: (relation: TServiceRelation) => string,
    ) => {
      if (relationIds.length < 2) return

      const anchorPosition = layout.positions[anchorServiceId]
      if (!anchorPosition) return

      const left: Array<{ id: string; x: number }> = []
      const center: Array<{ id: string; x: number }> = []
      const right: Array<{ id: string; x: number }> = []
      for (const relationId of relationIds) {
        const relation = relationById.get(relationId)
        if (!relation) continue

        const connectedPosition = layout.positions[getConnectedServiceId(relation)]
        if (!connectedPosition) continue

        const item = { id: relationId, x: connectedPosition.x }
        const delta = connectedPosition.x - anchorPosition.x
        if (Math.abs(delta) < 1) center.push(item)
        else if (delta < 0) left.push(item)
        else right.push(item)
      }

      left.sort((a, b) => b.x - a.x || a.id.localeCompare(b.id))
      right.sort((a, b) => a.x - b.x || a.id.localeCompare(b.id))
      center.sort((a, b) => a.id.localeCompare(b.id))

      for (const side of [left, right, center]) {
        side.forEach(({ id }, index) => {
          if (!offsets.has(id)) offsets.set(id, index * EDGE_LANE_GAP)
        })
      }
    }

    for (const [sourceId, relationIds] of relationIdsByService.outgoing) {
      assignLanes(sourceId, relationIds, (relation) => relation.target)
    }
    for (const [targetId, relationIds] of relationIdsByService.incoming) {
      assignLanes(targetId, relationIds, (relation) => relation.source)
    }

    return offsets
  }, [layout, relationIdsByService, relations])

  return { relationIdsByService, laneOffsetByRelation }
}
