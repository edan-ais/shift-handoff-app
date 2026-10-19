const assert = require('assert');
const P = require('../parse.js');
const today = new Date(2026, 9, 19); // Mon Oct 19 2026
const t = (line) => P.parseLine(line, today);
let n = 0; const ok = (name, fn) => { fn(); n++; console.log('ok', name); };

ok('owner and tomorrow', () => { const r = t('Sam to fix the walk-in cooler tomorrow'); assert.equal(r.owner, 'Sam'); assert.equal(r.due, '2026-10-20'); assert.equal(r.text, 'Fix the walk-in cooler'); });
ok('colon owner + weekday', () => { const r = t('Dana: order napkins by Friday'); assert.equal(r.owner, 'Dana'); assert.equal(r.due, '2026-10-23'); assert.equal(r.text, 'Order napkins'); });
ok('incident prefix', () => { const r = t('!Customer slipped near door, no injury'); assert.equal(r.type, 'incident'); assert.equal(r.owner, ''); assert.equal(r.due, ''); });
ok('incident: with owner', () => { const r = t('incident: Back door alarm went off at 9pm - Dana'); assert.equal(r.type, 'incident'); assert.equal(r.owner, 'Dana'); });
ok('at-mention and today', () => { const r = t('@Priya close out register 2 tonight'); assert.equal(r.owner, 'Priya'); assert.equal(r.due, '2026-10-19'); });
ok('not a name', () => { const r = t('Order napkins and cups'); assert.equal(r.owner, ''); assert.equal(r.text, 'Order napkins and cups'); });
ok('same weekday means next week', () => { assert.equal(t('Call vendor Monday').due, '2026-10-26'); });
ok('iso and m/d dates', () => { assert.equal(t('Renew permit 2026-11-02').due, '2026-11-02'); assert.equal(t('Renew permit 11/3').due, '2026-11-03'); });
ok('overdue', () => { assert.ok(P.isOverdue({ due: '2026-10-18', done: false }, today)); assert.ok(!P.isOverdue({ due: '2026-10-18', done: true }, today)); assert.ok(!P.isOverdue({ due: '', done: false }, today)); });
ok('carryover keeps only undone', () => { const c = P.carryover({ items: [{ text: 'a', done: true }, { text: 'b', done: false, owner: 'Sam' }, { text: '', done: false }] }); assert.equal(c.length, 1); assert.equal(c[0].owner, 'Sam'); assert.ok(c[0].carried); });
ok('blank lines ignored', () => { assert.equal(P.parseNotes('\n \nOrder cups\n', today).length, 1); });
console.log(n + ' tests passed');
