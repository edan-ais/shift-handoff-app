/* Rule-based note parsing for Shift Handoff. No network, no AI service.
   Pure functions so they can be tested in Node and used in the browser. */
(function (root) {
  var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var DAY_ABBR = { sun: 0, mon: 1, tue: 2, tues: 2, wed: 3, thu: 4, thur: 4, thurs: 4, fri: 5, sat: 6 };
  // Words that look like names at the start of a line but are not people.
  var NOT_NAMES = ['order', 'call', 'fix', 'check', 'clean', 'close', 'open', 'restock', 'buy', 'pick', 'send', 'email',
    'text', 'update', 'make', 'put', 'take', 'get', 'ask', 'tell', 'remind', 'follow', 'walk', 'customer', 'cooler',
    'register', 'door', 'back', 'front', 'we', 'i', 'the', 'a', 'an', 'need', 'needs', 'todo', 'task', 'incident',
    'today', 'tonight', 'tomorrow', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
    'by', 'eod', 'asap', 'no', 'out', 'low', 'new', 'broken', 'leak', 'spill', 'alarm', 'someone', 'everyone', 'nobody'];

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x; }
  function nextDow(today, dow, forceNext) {
    var diff = (dow - today.getDay() + 7) % 7;
    if (diff === 0) diff = 7; // "Friday" said on a Friday means next Friday
    if (forceNext && diff < 7 && today.getDay() !== 0) { /* "next X" stays the coming X unless it is this week */ }
    return addDays(today, diff);
  }

  // Returns {due: 'YYYY-MM-DD'|'', rest: text with the date phrase removed}
  function inferDate(text, today) {
    var t = text, m;
    if ((m = t.match(/\b(\d{4})-(\d{2})-(\d{2})\b/))) return { due: m[0], rest: strip(t, m[0]) };
    if ((m = t.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/))) {
      var y = m[3] ? (m[3].length === 2 ? 2000 + +m[3] : +m[3]) : today.getFullYear();
      var d = new Date(y, +m[1] - 1, +m[2]);
      if (!m[3] && d < addDays(today, -30)) d = new Date(y + 1, +m[1] - 1, +m[2]);
      if (d.getMonth() === +m[1] - 1) return { due: iso(d), rest: strip(t, m[0]) };
    }
    if ((m = t.match(/\b(?:by\s+)?(?:end of day|eod|tonight|today|asap|right away|before close)\b/i))) return { due: iso(today), rest: strip(t, m[0]) };
    if ((m = t.match(/\b(?:by\s+)?tomorrow\b/i))) return { due: iso(addDays(today, 1)), rest: strip(t, m[0]) };
    if ((m = t.match(/\b(?:by\s+|on\s+|next\s+|this\s+)?(sun(?:day)?|mon(?:day)?|tue(?:s|sday)?|wed(?:nesday)?|thu(?:r|rs|rsday)?|fri(?:day)?|sat(?:urday)?)\b/i))) {
      var key = m[1].toLowerCase(); var dow = DAYS.indexOf(key);
      if (dow < 0) dow = DAY_ABBR[key];
      if (dow !== undefined) return { due: iso(nextDow(today, dow, /next/i.test(m[0]))), rest: strip(t, m[0]) };
    }
    if ((m = t.match(/\b(?:in\s+)?(\d+)\s+days?\b/i)) && /in\s+\d+\s+days?|within/i.test(t)) return { due: iso(addDays(today, +m[1])), rest: strip(t, m[0]) };
    if ((m = t.match(/\bnext week\b/i))) return { due: iso(nextDow(today, 1)), rest: strip(t, m[0]) };
    return { due: '', rest: t };
  }

  function strip(t, piece) {
    return t.replace(piece, ' ').replace(/\s+(by|on|due|for)\s*([,.;:]|$)/i, '$2').replace(/\s{2,}/g, ' ').replace(/\s+([,.;:])/g, '$1').replace(/^[\s,;:\-]+|[\s,;:\-]+$/g, '').trim();
  }

  function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

  // Returns {owner: string, rest: text with the owner phrase removed}
  function inferOwner(text) {
    var t = text, m;
    if ((m = t.match(/(?:^|\s)@([A-Za-z][\w'-]*)/))) return { owner: cap(m[1]), rest: strip(t, m[0].trim()) };
    if ((m = t.match(/\((?:owner:\s*)?([A-Z][a-z][\w'-]*)\)/))) return { owner: m[1], rest: strip(t, m[0]) };
    if ((m = t.match(/\b(?:owner|assigned to|assign to|assign|give to|handle by|handled by)\s*[:\-]?\s+([A-Za-z][\w'-]*)/i)) && !isNotName(m[1])) return { owner: cap(m[1]), rest: strip(t, m[0]) };
    if ((m = t.match(/^([A-Z][a-z][\w'-]*)\s*(?:,|:|-)\s+(.+)$/)) && !isNotName(m[1])) return { owner: m[1], rest: m[2].trim() };
    if ((m = t.match(/^([A-Z][a-z][\w'-]*)\s+(?:to|will|should|needs to|can|is going to|is gonna|has to)\s+(.+)$/)) && !isNotName(m[1])) return { owner: m[1], rest: m[2].trim() };
    if ((m = t.match(/\s[-,]\s*([A-Z][a-z][\w'-]*)\s*$/)) && !isNotName(m[1])) return { owner: m[1], rest: t.slice(0, m.index).trim() };
    if ((m = t.match(/\b(?:for|ask|tell|remind)\s+([A-Z][a-z][\w'-]*)\s+(?:to|about)\b/)) && !isNotName(m[1]) && /^(?:ask|tell|remind)/i.test(m[0])) return { owner: m[1], rest: t };
    return { owner: '', rest: t };
  }
  function isNotName(w) { return NOT_NAMES.indexOf(w.toLowerCase()) >= 0; }

  // One line of notes -> item
  function parseLine(line, today) {
    var raw = line.trim();
    if (!raw) return null;
    var inc = /^(!|incident:)/i.test(raw);
    var body = raw.replace(/^(!|incident:)\s*/i, '').replace(/^[-*\u2022]\s*/, '');
    var o = inferOwner(body);
    var d = inferDate(o.rest, today);
    var text = d.rest || o.rest || body;
    return { type: inc ? 'incident' : 'task', text: text.charAt(0).toUpperCase() + text.slice(1), owner: o.owner, due: d.due,
      ownerAuto: !!o.owner, dueAuto: !!d.due, done: false };
  }

  function parseNotes(notes, today) {
    return String(notes).split('\n').map(function (l) { return parseLine(l, today || new Date()); }).filter(Boolean);
  }

  function isOverdue(item, today) { return !!item.due && !item.done && item.due < iso(today); }

  // Items from the last handoff that were not marked done.
  function carryover(lastHandoff) {
    if (!lastHandoff || !lastHandoff.items) return [];
    return lastHandoff.items.filter(function (i) { return i.text && !i.done; }).map(function (i) {
      return { type: i.type, text: i.text, owner: i.owner || '', due: i.due || '', ownerAuto: false, dueAuto: false, done: false, carried: true };
    });
  }

  var api = { parseLine: parseLine, parseNotes: parseNotes, inferOwner: inferOwner, inferDate: inferDate, isOverdue: isOverdue, carryover: carryover, iso: iso };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ShiftParse = api;
})(typeof window !== 'undefined' ? window : this);
