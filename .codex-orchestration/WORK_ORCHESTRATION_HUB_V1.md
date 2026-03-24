# Work Orchestration Hub V1

## Project

- Name: JamoFlow
- Revision: 2026-03-25
- Current Phase: Pipeline A/B baseline complete, Pipeline C/D refinement package complete, next UI package selection pending

## Objective

Turn the current prototype into a pipeline-driven product workflow where validation, content, learning UI, and writing interaction move through explicit dependent steps, with release checks applied as milestone gates.

## Current Working Package

- Active now: Pipeline C + Pipeline D
- Open backlog in parallel: none at the moment

## Pipeline Status

### Pipeline A: Stroke Validation Pipeline

- Goal: make stroke-order data trustworthy enough for learner-facing use
- Depends on: source collection, conflict resolution, runtime update
- Current focus: baseline complete for current MVP scope; re-open only if new source conflicts appear

### Pipeline B: Content Pipeline

- Goal: add example-word content with consistent difficulty and review standards
- Depends on: stable jamo structure and validation states
- Current focus: baseline complete for current MVP scope; re-open on second-pass content tuning

### Pipeline C: Learning UI Pipeline

- Goal: reshape the app around home -> detail -> practice -> write -> check
- Depends on: validation state visibility and content hooks
- Current focus: active package complete; next UI refinement package selection pending

### Pipeline D: Writing Interaction Pipeline

- Goal: define and implement mobile-first direct writing interaction
- Depends on: UI structure and content flow
- Current focus: active package complete; next writing refinement package selection pending

## Pipeline Dependency Graph

1. Pipeline A stabilizes data truth
2. Pipeline B attaches learner-facing content to validated data
3. Pipeline C exposes validated data + content in product flow
4. Pipeline D adds active writing behavior into the flow defined by Pipeline C

Build and smoke checks are embedded in each pipeline exit condition instead of being tracked as a separate pipeline.

## Active Workboards

- Working board: [DEVELOPMENT_AGENT_WORKBOARD_V1.md](./DEVELOPMENT_AGENT_WORKBOARD_V1.md)
- Review board: [REVIEW_AGENT_WORKBOARD_V1.md](./REVIEW_AGENT_WORKBOARD_V1.md)
- Handoff template: [HANDOFF_REPORT_TEMPLATE_V1.md](./HANDOFF_REPORT_TEMPLATE_V1.md)

## Rules

- Do not mark a pipeline complete without artifact evidence.
- Update the tasklist after any pipeline milestone changes.
- Use review before accepting important pipeline structure or validation changes.
- Prefer single-agent local execution unless delegation removes real idle time or isolates review.

## Current Critical Risks

- Remaining work is refinement, not baseline construction.
- Next package scope should be chosen before further implementation.
