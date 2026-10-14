# Backend Function Arity remediation

## Scope

This document records the six `Credo.Check.Refactor.FunctionArity` findings that formed the
migration baseline. The migration has been implemented, and the focused FunctionArity check now
reports zero findings.

The configured maximum arity is eight. The findings are all private workflow helpers, so their
public API does not need to change. The goal is not to hide parameters in an untyped map; it is to
make the workflow context and its invariants explicit.

## Baseline findings

| Area                   | Function                                                  | Arity | Main concern                                                            |
| ---------------------- | --------------------------------------------------------- | ----: | ----------------------------------------------------------------------- |
| Wallpaper publish      | `CMS.Wallpaper.Workflow.publish_once/9`                   |     9 | One publish request is passed as unrelated positional values.           |
| Wallpaper publish      | `CMS.Wallpaper.Workflow.publish_transaction/10`           |    10 | Repeats the same publish context and adds the prepared capability.      |
| Docs publish           | `CMS.DocTree.Publish.Workflow.publish_selected_changes/9` |     9 | Three selection lists are easy to pass in the wrong order.              |
| Interaction projection | `CMS.Interactions.Projection.Sync.update_projection!/9`   |     9 | Dynamic Ecto field configuration and runtime values are mixed together. |
| Asset replacement      | `CMS.Assets.ReplacementPlan.apply_claimed_locator/12`     |    12 | Plan, article, run, step and lease ownership state are all mixed.       |
| Asset replacement      | `CMS.Assets.ReplacementPlan.apply_locator_step/10`        |    10 | Repeats most of the same locator workflow context.                      |

## Proposed boundaries

### 1. Wallpaper publish context

Introduce one private, typed publish context shared by `publish_once/…` and
`publish_transaction/…`. It should carry the request-scoped values that always move together:

- community;
- theme and normalized settings;
- base and fixture versions;
- command ID and batch reference;
- request digest;
- actor identity, which `publish_transaction/…` currently uses only to populate
  `created_by_id`.

Keep the prepared capability separate when entering the transaction. It represents a later
workflow phase and should not be constructible by ordinary callers. The intended private
signatures are therefore conceptually `publish_once(context)` and
`publish_transaction(context, capability)`: `publish_once/…` prepares the capability, while only
the transaction helper receives it explicitly.

Before changing the signatures, add or retain tests for command replay, digest conflicts, lease
loss, transaction rollback and recovered receipts.

### 2. Docs publish selection

The implementation reuses the `Selection` module's validated map for the three sets of checklist
IDs:

- document changes;
- tree changes;
- restored tree changes.

Keep community, branch, current checklist, actor, `sync_cover?` and options explicit. Those values
have different lifetimes and should not be hidden inside a generic bag merely to reduce arity.
This remains a map rather than a struct, but construction and updates stay behind the dedicated
`Selection` module instead of accepting an unchecked free-form map. In particular, `sync_cover?`
controls a publish side effect rather than which checklist items are selected, so it does not belong
in `Selection`. The resulting boundary is
`publish_selected_changes(community, branch, current_checklist, selection, actor, sync_cover?,
options)`.

The focused tests must cover partial selection, delete overlap rejection, tree restore, cover sync
and transaction failure.

### 3. Interaction projection update specification

Separate static projection configuration from runtime change data:

- configuration: schema, bitmap field, count field and latest-user field;
- target: projection ID;
- change: user ID, add/remove operation, latest users and revision behavior.

A small typed struct or validated private constructor is preferable to a free-form map because a
field name supplied in the wrong slot can still produce valid but incorrect Ecto updates.

Tests must assert add/remove symmetry, counter updates, latest users and projection revision.

### 4. Asset replacement locator context

This was the highest-risk arity finding. The implementation introduced three explicit structs
around the existing phases:

- plan context: plan, community, actor, apply-run reference and owner;
- article context: current item, article ID, body bag and draft version;
- step context: locator, step reference and claimed step.

The originally proposed run context was merged into `PlanContext` because the apply-run reference
and lease owner have the same lifetime as the plan-level values throughout locator application. They
are not independently constructed or passed to another phase, so a fourth struct would not create a
meaningful boundary.

Do not combine all twelve arguments into one arbitrary map. Construction should happen at the
point where each phase has validated its invariants, and the transaction helper should receive only
the context required for that phase.

Tests must cover already-succeeded locators, retries, stale claims, failed-step persistence, draft
version changes and transaction rollback.

## Delivery order

1. Wallpaper publish context: two findings with one shared request model.
2. Docs publish selection: narrow data-shape extraction.
3. Interaction projection specification: requires careful Ecto assertion coverage.
4. Asset replacement contexts: largest change and highest workflow risk.

Run focused tests after each area, then run `mix compile --warnings-as-errors`, the complete backend
test suite and `mix credo --strict`. `FunctionArity` should only be considered complete when all six
findings reach zero without replacing positional arguments with unchecked maps.

`CMS.DocTree.Events.insert_staged_event/8` and
`CMS.Command.Receipt.Runner.execute_command/8` are already at the configured maximum arity. They are
not part of this migration, but adding another parameter to either function will create a new
`FunctionArity` finding and should trigger a boundary review rather than another positional argument.
