# JamoFlow Example Word Selection Criteria

## Purpose

Define how example words are chosen so content work in Pipeline B is consistent and reviewable.

## Selection Rules

1. Prefer words a beginner can recognize or learn quickly.
2. Prefer 1-2 syllable words when possible.
3. Prefer concrete nouns before abstract vocabulary.
4. Avoid culturally narrow or advanced loanwords unless they are extremely common.
5. Avoid words whose main learner value conflicts with the target jamo.

## Linguistic Rules

1. The target jamo should be easy to spot in the written form.
2. Avoid examples where pronunciation shifts hide the target jamo for beginners.
3. Avoid examples whose usefulness depends on 받침, 축약, or advanced sound change explanations in MVP.
4. Keep glosses short and learner-facing.

## Difficulty Labels

- `starter`: immediate beginner-friendly word
- `basic`: still beginner-usable, but slightly longer or less concrete

## Preferred Category Order

1. body / family / common object
2. food / animal / clothing
3. place / action / descriptive word

## Exclusion Rules

- no slang
- no ambiguous glosses unless note is added
- no words mainly useful for another later curriculum topic

## Review Questions

1. Is the word beginner-friendly?
2. Is the target jamo visually obvious?
3. Does the gloss help a learner quickly?
4. Would a teacher accept this as a first-example word?

## Current Follow-Up

- audit existing `examples` data in `src/data/jamoData.ts`
- replace weak examples before calling Pipeline B complete
