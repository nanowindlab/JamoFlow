# JamoFlow Review Checklist

## Purpose

Provide a shared review checklist for important stages so review agents and local review use the same frame.

## Validation Review

1. Did the claimed stroke order come from direct artifact evidence?
2. Were at least two sources compared when possible?
3. Does `jamoData.ts` match the validation matrix?
4. Does the runtime UI reflect the same stroke count and order?

## Content Review

1. Do example words follow the selection criteria?
2. Are glosses short and beginner-friendly?
3. Are there duplicates or awkward examples?
4. Does any example overstate content confidence for unverified jamo?

## UI Review

1. Does the screen match the intended learning flow?
2. Is status information visible but not dominant?
3. Are mobile layouts readable and tappable?
4. Does the UI avoid presenting uncertain data as final?

## Interaction Review

1. Does the writing flow respect mobile touch behavior?
2. Are reset, undo, and hint actions obvious?
3. Do drawing and scrolling conflict?
4. Is the interaction simple enough for MVP?

## Release Review

1. Does the build pass?
2. Are tasklist and docs aligned with the code?
3. Are the remaining risks explicitly documented?
4. Is the next pipeline step clear?
