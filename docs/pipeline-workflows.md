# JamoFlow Pipeline Workflows

## Purpose

Define one connected delivery pipeline for the product, then break each workflow into ordered, dependent steps so work can be executed pipeline by pipeline.

## Master Delivery Pipeline

```text
Source Validation
  -> Content Attachment
  -> Learning UI Assembly
  -> Writing Interaction
```

Each later workflow assumes the earlier workflow has produced stable enough inputs.

## Pipeline A: Source Validation

### Goal

Produce learner-facing stroke-order data that can be trusted.

### Inputs

- workbook PDF
- external stroke-order images
- current `src/data/jamoData.ts`
- current validation matrix

### Workflow

1. Collect source evidence for one jamo set
2. Compare source evidence against current runtime data
3. Classify each jamo as `confirmed`, `first_pass_checked`, or `conflict_found`
4. Update `jamoData.ts` and validation matrix together
5. Run build and check runtime rendering
6. Only then unlock downstream content/UI work for that jamo

### Exit Condition

- target jamo moved to `confirmed`, or
- conflict is explicitly documented and isolated
- build passes
- affected runtime UI is checked
- validation matrix and tasklist are synced

## Pipeline B: Content Attachment

### Goal

Attach example words and future supporting content to validated jamo data.

### Inputs

- validated or partially validated jamo data
- example-word data model
- content selection rules

### Workflow

1. Define selection policy for learner-safe example words
2. Draft word candidates per jamo
3. Check difficulty, ambiguity, and learner usefulness
4. Attach approved examples to data model
5. Review for duplicates, odd glosses, and unstable choices
6. Mark which content is safe for learner-facing exposure

### Exit Condition

- each MVP jamo has reviewed example words
- build passes if runtime data changed
- content docs and tasklist are synced
- review checklist is applied for learner-facing examples

## Pipeline C: Learning UI Assembly

### Goal

Turn validated data and example content into a coherent learning flow.

### Inputs

- validation states
- example words
- current app components
- wireframe doc

### Workflow

1. Define the primary screen for the current phase
2. Map data fields to concrete UI regions
3. Implement state badges and example cards
4. Reduce non-essential visual noise
5. Verify mobile hierarchy and readability
6. Re-check that the UI does not overstate unverified data

### Exit Condition

- home, list, and detail screens support the intended learning flow
- build passes
- mobile layout smoke check is completed
- tasklist and UI docs are synced

## Pipeline D: Writing Interaction

### Goal

Add mobile-first direct writing behavior without breaking the learning flow.

### Inputs

- mobile writing requirements
- screen structure from Pipeline C
- validated stroke hints

### Workflow

1. Define input event model
2. Implement blank-canvas writing component
3. Add hint, reset, and undo interactions
4. Test scroll and touch conflicts on mobile layouts
5. Decide whether basic completion feedback is stable enough

### Exit Condition

- users can write, erase, and retry on mobile
- build passes
- mobile touch smoke check is completed
- tasklist and requirements docs are synced

## Operating Rules For Agent Use

### Use agents when

- a review pass can run in parallel with local implementation
- a bounded read-only scan can answer a specific question faster
- a non-blocking sidecar task can advance another pipeline while local work continues

### Avoid agents when

- the task is tiny and local execution is faster
- the next step is blocked on the result anyway
- coordination overhead is greater than the work itself

### Review-agent checkpoints

- pipeline changes
- validation status upgrades to `confirmed`
- milestone-ready implementation changes

## Current Pipeline Order

1. Finish high-priority Source Validation for blocked jamo
2. Lock example-word policy
3. Complete detail-screen UI pass
4. Start writing interaction implementation

Build, smoke checks, and document sync are required at the end of each pipeline stage rather than tracked as a separate pipeline.
