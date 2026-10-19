---
doc: scope
status: approved
---
# Shift Handoff
A browser tool that turns a shift lead's rough notes into a clear next-shift handoff, picking up owners and due dates from how people already write.

## The Unique Kernel
Write notes the way you talk ("Sam to fix the cooler tomorrow") and get a handoff with the owner and due date already filled in, with anything missing or overdue flagged instead of silently dropped.

## Who It's For
A shift lead at a small shop, restaurant or clinic. Today they hand off with a text message or a sticky note, and the "who is doing this, and by when" part gets lost between shifts.

## The Core Loop
At the end of a shift they paste or type their notes, review what the tool inferred, fix gaps, and build the handoff. Next shift, the items nobody finished are waiting for them as carry-over.

## Inspiration & Identity
Plain, calm, work-tool feel: clear hierarchy, color-coded rows, no clutter. No outside references were given.

## Why This Matters
A handoff that loses who owns a task and by when causes dropped work. This tool keeps owner and due date visible for the next shift.

## What "Working" Looks Like
Paste six lines of notes, press one button, and see owners and due dates filled in where the notes named them, yellow rows where they didn't. Build the handoff, then open it next shift and see the unfinished items carried over.

## The POC Boundary
- Paste notes, one line per item; "!" or "incident:" marks an incident.
- Rule-based owner and due-date inference (no AI service, no network).
- Review and edit table, done checkbox, gap and overdue flags.
- Handoff view and copy-as-text; saved handoffs and carry-over of unfinished items.
- Data in the browser only (localStorage).

## Later
Shared handoffs between devices, reminders, multiple locations.

## Explicitly Cut
- Accounts and sync: needs a server, not needed to prove the kernel.
- AI or language-model parsing: costs money and needs a key; the rule-based version proves the idea.
- Notifications: out of POC scope.

## About Me
I'm co-founder and CTO of wAIwiser and I build software with AI coding agents. I wanted a structured, spec-first workflow for a small project.

## What I Wanted to Learn
I wanted to learn to scope a project tightly, write the spec first, and ship something small that works.
