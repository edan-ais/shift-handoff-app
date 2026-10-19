# Shift Handoff
A browser tool for small-shop shift leads. Paste end-of-shift notes written the way people talk ("Sam to fix the cooler tomorrow", "Dana: order napkins by Friday", "@Priya close register tonight"). It proposes tasks and incidents, fills in owners and due dates it can infer, flags anything missing or overdue, builds a next-shift handoff, and carries unfinished items over to the next one.

No server, no accounts, no network calls, no AI service. Owner and date inference is rule-based (`parse.js`). Data stays in your browser (localStorage).

## Run
Open `index.html` in a browser.

## Test
`node test/parse.test.js`

## Planning docs
Made with the Devpost Learn Skill Pack: `devpost/scope.md`, `devpost/prd.md`, `devpost/spec.md`, `devpost/checklist.md`.

## License
MIT
