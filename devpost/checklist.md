---
doc: checklist
status: approved
mode: fast
---
# Build Checklist
## Slices
- [x] Build: notes parsing in `parse.js` with tests. Verify: `node test/parse.test.js` passes (11 tests). Learner check: type "Sam to fix the cooler tomorrow" and see Sam and tomorrow's date filled in.
- [x] Build: page UI, review table, handoff view. Verify: headless Chrome render of each state. Learner check: paste notes and press Propose tasks.
- [x] Build: history and carry-over. Verify: seeded history renders the carry-over card and "Add to this shift" adds the items. Learner check: build a handoff, reload, see unfinished items.
## Hands-on Checkpoints
- [ ] Early feedback: the learner viewed the first version of this app earlier and called the UI "really bad" (redesigned since).
- [ ] Final kick-the-tires: the learner reviews the demo video before anything is submitted (delegated review, pending).
## Final Review
- [x] Mechanical: tests pass, page renders in headless Chrome with no console errors in the demo run.
- [ ] Learner review of the finished app: pending, via the demo video.
## Code Tour and App Map
- `parse.js` owns every guess; `index.html` owns display and storage; `test/parse.test.js` pins the rules. Learner walkthrough not done (delegated).
## Revisions
- Hands-on boxes are left unchecked because the learner has not yet performed them.
