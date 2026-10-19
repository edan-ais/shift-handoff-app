---
doc: spec
status: approved
---
# Shift Handoff — Technical Spec

## How This Works, In Plain Language
A web page reads each line you type and uses simple pattern rules to guess who owns it and when it is due. Everything you see is stored in your browser, not on a server.

## The Core Journey Through the System
Textarea -> `ShiftParse.parseNotes` -> items array -> table render -> Build handoff renders the view, writes plain text, and saves a snapshot to history -> next load reads history and shows unfinished items.

## Stack
Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies. Node is used only to run the tests.

## Where It Runs and How Someone Tries It
Open `index.html` in a browser (it loads `parse.js` beside it). Tests: `node test/parse.test.js`. Repository: https://github.com/edan-ais/shift-handoff-app

## Look and Feel
As in prd.md: blue header, white cards, color-coded rows, "auto" chips.

## Components
### parse.js
Pure functions: `parseLine`, `parseNotes`, `inferOwner`, `inferDate`, `isOverdue`, `carryover`. Date logic takes a "today" argument so it is testable.
### index.html
UI, rendering and localStorage (`sh_items`, `sh_history`).
### test/parse.test.js
Node assert tests for owner/date inference, incidents, overdue and carry-over.

## Data Model
Item: `{type: task|incident, text, owner, due (YYYY-MM-DD), ownerAuto, dueAuto, done, carried?}`. History entry: `{label, items[]}`.

## File Structure
`index.html`, `parse.js`, `test/parse.test.js`, `devpost/` (planning docs), `README.md`, `LICENSE`.

## External Services and Dependencies
None. No network calls, no API keys.

## Important Failure Modes
A line with an unusual name pattern gets no owner (flagged, not guessed). A date phrase the rules don't know is left in the text. localStorage disabled means data is not kept.

## What Was Simplified and Why
Pattern rules instead of a language model, to stay free and fully offline. Same-weekday dates mean next week.

## Decisions and Open Issues
Rule-based inference only (agent proposal, approved to proceed by the learner). Run the app by opening the file; a live deployment is optional and not part of this build.
