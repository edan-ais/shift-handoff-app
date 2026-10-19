---
doc: prd
status: approved
---
# Shift Handoff — Product Requirements

## The Core Journey
Develops scope "The Core Loop". The lead opens the page, pastes notes, presses Propose tasks, reviews the table, presses Build handoff, and copies or reads it. Next shift, carry-over appears at the top.

## Screens and Layout
One page, top to bottom: a carry-over card (only when there is something to carry), 1 Paste notes, 2 Review and assign, 3 Next-shift handoff.

## Look and Feel
Blue header, white cards, numbered steps. Task rows have a blue left edge, incidents red, rows missing an owner or date yellow, done rows faded and struck through. Small "auto" chips mark inferred fields.

## Features and Behavior
### Notes parsing (scope: Unique Kernel)
- One line is one item. A leading "!" or "incident:" makes it an incident.
- Owner is picked up from patterns like "Sam to ...", "Dana: ...", "@Priya ...", "assign Sam", "... - Dana".
- Due date is picked up from today, tonight, EOD, tomorrow, weekday names (the same weekday means next week), ISO dates and m/d dates.
- The owner and date phrases are removed from the task text. Inferred fields show an "auto" chip until edited.
### Review (scope: Core Loop)
- Every field is editable; type switch; remove; done checkbox; add blank item.
### Handoff (scope: Core Loop)
- Incidents first, then tasks; done items are left out. Banner counts items missing an owner or date and overdue items. "Copy as text" gives a plain-text version.
### Carry-over (scope: What Working Looks Like)
- Building a handoff saves it. On the next visit, items from the last handoff that were not done appear in a card with "Add to this shift".

## States and Boundaries
Empty list shows a hint. Unknown names are left blank rather than guessed. Items are never blocked for missing fields, only flagged.

## Product Decisions
- Agent proposed, learner approved proceeding: rule-based inference only, no paid AI.
- A name is only taken when the line has a clear owner pattern; common task verbs and nouns are not treated as names.
- Last 20 handoffs kept.

## What We're Building
Everything under "Features and Behavior".

## Deferred From the POC
Sync, reminders, multi-location.

## Possible Later Enhancements
Language-model parsing as an optional add-on, shift templates.

## Non-Goals
Replacing a scheduling or task-management system.

## Open Questions
None blocking. Learner answers on experience and learning goals are "not established" (delegated).
