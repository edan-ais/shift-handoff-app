---
doc: checklist
status: approved
mode: fast
---
# Build Checklist
## Slices
- [x] Build: notes parsing in `parse.js` with tests. Verify: `node test/parse.test.js` passes (11 tests). My check: type "Sam to fix the cooler tomorrow" and see Sam and tomorrow's date filled in.
- [x] Build: page UI, review table, handoff view. Verify: headless Chrome render of each state. My check: paste notes and press Propose tasks.
- [x] Build: history and carry-over. Verify: seeded history renders the carry-over card and "Add to this shift" adds the items. My check: build a handoff, reload, see unfinished items.
## Hands-on Checkpoints
- [ ] Early feedback: I viewed the first version of this app earlier and called the UI "really bad" (redesigned since).
- [ ] Final kick-the-tires: I review the demo video before anything is submitted (pending).
## Final Review
- [x] Mechanical: tests pass, page renders in headless Chrome with no console errors in the demo run.
- [ ] My review of the finished app: pending, via the demo video.
## Code Tour and App Map
- `parse.js` owns every guess; `index.html` owns display and storage; `test/parse.test.js` pins the rules. My walkthrough is not done.
## Revisions
- Hands-on boxes are left unchecked because I have not yet performed them.
