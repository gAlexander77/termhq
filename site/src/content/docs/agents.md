---
title: "Running coding agents"
weight: 60
description: "The parts of TermHQ built specifically for running Claude Code, Codex, and other coding agents."
---

TermHQ is a terminal, so any agent that runs in a terminal runs in it. These are
the parts that exist because of agents specifically.

## Launching one

Every pane header has an **✳** button listing your agent commands — Claude Code,
Codex, OpenCode and Antigravity out of the box. Picking one types its command
into that pane's shell and hands keyboard focus back to the terminal.

The list is yours to edit in **Settings → Agents**, flags included, so
`claude --dangerously-skip-permissions` is one click rather than something you
retype all day. Entries whose program is not on your `PATH` are hidden
automatically — you never see an agent you do not have, and never press a dead
button.

### By number, without the mouse

Several agents across several panes should not mean a trip to a dropdown for each.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> then a digit runs an agent in the
focused terminal: <kbd>1</kbd>–<kbd>9</kbd> and <kbd>0</kbd> for the tenth, in the
order the list is arranged in Settings. While it is armed, a card lists the
numbered agents so the mapping is never guesswork; <kbd>Esc</kbd> cancels.

Only installed agents are numbered — the same `PATH` filtering as the dropdown,
so the numbers always match what you can see.

## Knowing when one has finished

The problem with running several agents is not starting them, it is noticing when
one stops.

A pane that was busy while you were looking elsewhere and has since gone quiet
gets a pulsing header: the dot, an inset wash and the bottom hairline all breathe
in the theme's attention color. Stashed panes badge their shelf card, so a
parked job can still get your attention. The same trigger raises a toast naming
the pane and its directory — in-app while the window is focused, a native OS
notification while it is not — and clicking it jumps to that pane wherever it is,
including zoomed away or on the shelf.

It deliberately stays quiet about three things, each measured rather than
assumed: the echo of your own typing, work you watched happen (launching an agent
and reading its banner is not news), and anything over in under three seconds.
The quiet threshold is configurable, which matters for agents that pause to
think — it decides how long a pane may wait mid-job before the wait reads as the
job ending.

## Agents come up in color

Coding agents often render monochrome inside other terminals, and the usual
culprit is not the agent. When one tool launches another, environment variables
leak: a `NO_COLOR=1` set by whatever started your terminal is inherited by every
shell it spawns, and well-behaved programs obey it.

TermHQ scrubs those leaked variables on every shell it starts and sets the
capability variables that say color is supported. Agents come up in color
because the environment they are handed is correct, not because TermHQ
special-cases any particular tool.

## Panes are born at their final width

A pane is created at the size it will be displayed at, so a shell's startup
output — and an agent's first banner — is composed for the width you will read
it at rather than reflowed afterwards.

## Watching several at once

Tiling is the point. Agents working means panes visible, not tabs where all but
one are hidden. There is no cap on how many — the grid keeps growing, and when
it gets busy you can park the ones you are not watching without stopping them.

Each pane's font size is independent, so an agent producing a wall of output can
be small while the shell you type in stays comfortable.

## Watching what an agent is building

An agent building a web app is producing something you have to look at, and
alt-tabbing to a browser window is how you lose the pane it is working in.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> opens a
[browser pane](/docs/browser-panes/) in the grid instead — point
**Settings → Browser → New panes open** at `localhost:3000` and every new one
lands on your dev server. Drag the boundary between it and the agent's terminal
to give the page the width it wants; a web page has a natural width and a
terminal does not.

## Long jobs survive you leaving

Agents run long. Because shells live in a separate process
([Persistent sessions](/docs/persistent-sessions/)), you can quit TermHQ while
an agent is mid-task and pick it up later with its output intact.

## Directory awareness

TermHQ knows which directory each pane is in, and keeps up as the shell moves
around. The file panel follows the focused pane, so it is already showing the
folder the agent is working in rather than your home directory. So does the Git
panel — repo, branch, staged and changed files for whichever pane you are looking
at, which is how you review what an agent just did without leaving the app.

That works with WSL panes too, so a shell inside a distribution still steers the
panels correctly.

The `</>` button in the pane header opens that directory in your editor, for the
moments when the right move is to take over by hand.

## Dictating to an agent

Prompts are long, and typing them is the slow part. TermHQ's dictation writes
into the focused pane, so you can talk a prompt at an agent and edit it before
sending.

Transcription happens on your machine, on a local Whisper model you pick and
download once in **Settings → Voice** (or bring your own) — which matters for
a tool sitting in front of proprietary source. English by default, sixteen
other languages in the same panel; not yet available on Linux.

## Keeping their keystrokes theirs

Agents with full-screen interfaces want chords TermHQ also uses. Ultra focus
turns off every TermHQ shortcut so the terminal receives all of them unmodified.
See [Panes and layout](/docs/panes-and-layout/).
