---
title: "Running coding agents"
weight: 60
description: "The parts of TermHQ built specifically for running Claude Code, Codex, and other coding agents."
---

TermHQ is a terminal, so any agent that runs in a terminal runs in it. These are
the parts that exist because of agents specifically.

## Launching one in the focused terminal

Every pane header has an **✳** button listing your agent commands — Claude Code,
Codex, OpenCode and Antigravity out of the box. Picking one types its command
into that pane's shell and hands keyboard focus back to the terminal.

The list is yours to edit in **Settings → Agents**, flags included, so
`claude --dangerously-skip-permissions` is one click rather than something you
retype all day. Entries whose program is not on your `PATH` are hidden
automatically — you never see an agent you do not have, and never press a dead
button.

## Launching one in a folder or worktree

You do not need to open a terminal first. Anywhere TermHQ offers an **Open in
&lt;shell&gt;** list — a folder in Files, a favorite, or a row in the global
[Worktrees](/docs/worktrees/) view — right-click the shell you want. A flyout
lists the installed agents under the same marks as the pane-header launcher.
Pick one and TermHQ opens that shell in the selected folder, then starts the
agent in it.

A normal click still opens only the shell. The agent list waits behind a
right-click so the ordinary “open a terminal here” action stays unambiguous.

### By number, without the mouse

Several agents across several panes should not mean a trip to a dropdown for each.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> then a digit runs an agent in the
focused terminal: <kbd>1</kbd>–<kbd>9</kbd> and <kbd>0</kbd> for the tenth, in the
order the list is arranged in Settings. While it is armed, a card lists the
numbered agents so the mapping is never guesswork; <kbd>Esc</kbd> cancels.

Only installed agents are numbered — the same `PATH` filtering as the dropdown,
so the numbers always match what you can see.

The chord needs a **terminal** focused, since what it does is type a command
into a shell. Press it with an [editor](/docs/editor/) or a
[browser pane](/docs/browser-panes/) in front and it says so rather than opening
a picker that could not have worked.

## Knowing when one has finished

The problem with running several agents is not starting them, it is noticing when
one stops.

A pane that was busy while you were looking elsewhere and has since gone quiet
gets a pulsing header: the dot, an inset wash and the bottom hairline all breathe
in the theme's attention color. On a stashed terminal, the shell icon on its
shelf card lights and pulses instead, so a parked job can still get your
attention. The same trigger raises a toast naming
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

Installing an update restarts the shells, however. Finish important jobs before
choosing **Update and restart**; see [Updating](/docs/installation/#updating).

## Directory awareness

TermHQ knows which directory each pane is in, and keeps up as the shell moves
around. The file panel follows the focused pane, so it is already showing the
folder the agent is working in rather than your home directory. So does Source
Control — repository, branch, changes, staging, commits and history for whichever
pane you are looking at, which is how you review and ship what an agent just did
without leaving the app.

If you use separate Git checkouts for parallel tasks, the global
[Worktrees](/docs/worktrees/) view keeps them grouped by repository and puts a
terminal or agent action directly on each one. It shows checkout state without
guessing whether an agent is running there.

Files follows WSL directories too. Source Control does not yet support
repositories reached through WSL paths; use Git in the WSL terminal for those.

The `</>` button in the pane header opens that directory in your editor, for the
moments when the right move is to take over by hand. For a smaller
intervention — one line in a config, a typo in a prompt file — an
[editor pane](/docs/editor/) opens the file right there in the grid, beside the
agent that is waiting on it. A file an agent rewrites while you have it open
reloads on its own, or asks first if you have unsaved edits of your own.

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
