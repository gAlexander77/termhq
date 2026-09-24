---
title: "Running coding agents"
weight: 60
description: "The parts of TermHQ built specifically for running Claude Code, Codex, and other coding agents."
---

TermHQ is a terminal, so any agent that runs in a terminal runs in it. These are
the parts that exist because of agents specifically.

## Launching one in the focused terminal

A terminal pane's header has an **✳** button listing your agent commands —
Claude Code, Codex, OpenCode, Antigravity and Grok Build out of the box. Like the
header's other tools, it shows on the focused pane, and on any other pane while
the pointer is over it. Picking one types its command into that pane's shell and
hands keyboard focus back to the terminal. The menu ends with **Manage agents…**,
which opens **Settings → Agents**.

A launcher appears once its command is on your `PATH`, and an install that
predates one of them picks it up on its own. With none found, the button stays,
dimmed, and takes you to **Settings → Agents** to set one up. A pane whose shell
has ended has no agent button, since there is nothing to type into, and neither
has an [SSH pane](/docs/ssh/): the agents TermHQ found are on this machine, and
the command would run on the far host.

Use a terminal at an idle shell prompt. Finish or clear any partially typed
command first, and do not launch into a program that is already using the
terminal. To keep that program running, launch the agent in a new pane instead.

Where the shell reports each prompt to TermHQ — as PowerShell, Command Prompt,
Git Bash and WSL's bash do on Windows — TermHQ catches the most common slip for
you. If the agent it last launched in a pane is still running there, because the
shell has not shown a prompt since, a second launch opens a new pane with the
same shell and folder and starts the agent in that, instead of typing the command
into the running agent.

In any shell, a second launch into the same pane within three seconds is not sent
at all, so a double click never types the command twice; the pane says **Sent a
moment ago · one command every 3 s**.

The list is yours to edit in **Settings → Agents → Agent launchers**, flags
included, so `claude --dangerously-skip-permissions` is one click rather than
something you retype all day. Each row shows the number the agent answers to, its
mark, its name, whether its command was found — *found*, *not on PATH*, or
*checking…* — and the command itself. **Add agent** starts a new row; drag a row
by its grip to reorder, or focus the grip and use the arrow keys; removing one
asks **Remove?** first. Entries whose program is not on your `PATH` are hidden
from the menus automatically, so a launcher missing from the menu is explained
where you would look for it. If the numbered picker has no available entries,
the command palette tells an empty agent list apart from agents it could not find
on your `PATH`.

### Command detection on macOS

Opening TermHQ from Finder or the Dock should find the same agent CLIs as your
terminal. TermHQ reads the `PATH` from your interactive login shell and caches
it, including paths added by Homebrew, npm and shell startup files. IDE and file
openers use that resolved path too. The initial launcher lookup runs in the
background so it does not hold up the interface.

If you install an agent or change your shell's `PATH` while TermHQ is open,
restart TermHQ to refresh command detection. On Windows, TermHQ uses the path
in its process environment.

## Launching one in a folder or worktree

You do not need to open a terminal first. Anywhere TermHQ offers an **Open in
&lt;shell&gt;** list — a folder in Files, a favorite, or a row in the global
[Worktrees](/docs/worktrees/) view — open the flyout on the shell you want: click
the chevron at the row's edge, right-click the row, or press <kbd>→</kbd> on it.
The flyout lists the installed agents under the same marks as the pane-header
launcher. Pick one and TermHQ opens that shell in the selected folder, then starts
the agent in it.

A click on the row itself still opens only the shell. The agent list waits behind
the chevron so the ordinary “open a terminal here” action stays unambiguous.

The arrow beside the **+** button in the title bar opens the shell menu, which
reaches the same place without the Files panel: a shell's flyout lists your
favorite folders, and a favorite's flyout lists the agents to start there.

### By number, without the mouse

Several agents across several panes should not mean a trip to a dropdown for each.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> then a digit runs an agent in the
focused terminal: <kbd>1</kbd>–<kbd>9</kbd> and <kbd>0</kbd> for the tenth, in the
order the list is arranged in Settings. While it is armed, a card lists the
numbered agents so the mapping is never guesswork, and its title names the
terminal the command will be typed into; <kbd>Esc</kbd> cancels.

Only installed agents are numbered — the same `PATH` filtering as the dropdown,
so the numbers always match what you can see. Both the number row and numeric
keypad work, including <kbd>0</kbd> for the tenth entry.

The chord needs a **terminal** with its shell still running, since what it does
is type a command into it. With an [editor](/docs/editor/) or a
[browser pane](/docs/browser-panes/) in front, a terminal whose shell has ended,
or an SSH pane, it does not open a picker that could not work: the key goes on to
the pane, and the command palette's **Run an agent by number** row says why.

The command palette also lists each installed agent by name — **Run Claude
Code** and the like — to type into the focused terminal.

<span id="knowing-when-one-has-finished"></span>

## When a pane needs your attention

The problem with running several agents is not starting them, it is noticing when
one stops.

A pane that was busy while you were looking elsewhere and has since gone quiet
gets a pulsing header: the icon at its left that shows what kind of pane it is
pulses in the theme's attention color, and an inset wash and the bottom hairline
breathe with it. On a stashed terminal, the shell icon on its shelf card lights
and pulses instead, so a parked job can still get your attention. This works for
longer-running commands as well as coding agents.

Waiting panes collect in the bottom status bar as a count — **N waiting** —
that stays as long as anything is waiting. For a few seconds after a new pane
goes quiet, a chip joined to its left names that pane under a draining bar;
click the chip to jump straight to it. Click the count to open the list,
newest first. Each entry shows the time the pane went quiet — *waiting since
2:45 PM* — and whether it is **in the grid** or **in the stash shelf**.

Click an entry to focus that pane, restoring it from the shelf or bringing it
back into view if another pane is maximized. From the keyboard, <kbd>Tab</kbd> to
the count and press <kbd>Enter</kbd>: the list opens with focus on its first
entry, <kbd>↑</kbd> <kbd>↓</kbd>, <kbd>Home</kbd> and <kbd>End</kbd> move between
entries, and <kbd>Enter</kbd> or <kbd>Space</kbd> jumps. An entry's **Dismiss**
button removes only the notice; it does not close the pane or stop its work. With
more than one waiting, **Dismiss all** clears every notice at once.
<kbd>Esc</kbd> closes the list without clearing it.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd> — **Jump to the newest waiting
pane** — goes straight to the pane that went quiet most recently, the first entry
in the list, without opening it.

Notices do not expire on a timer. Returning to the pane, dismissing its notice,
or closing the pane clears its entry. The waiting item disappears when the list
is empty by default. To keep it visible, enable **Settings → Agents → Always
show it, even when nothing is waiting**. It then reads **0 waiting**, and opening
the empty list shows **Nothing waiting right now.**

When TermHQ is in the background, the same trigger also sends a native OS
notification, and the in-app entry is waiting for you when you return. **Show
waiting panes in the status bar** in **Settings → Agents** controls both kinds
of notification;
**Agent idle badge** controls the pane and shelf highlights separately.

TermHQ ignores the echo of your own typing, work you watched happen, and jobs
over in under three seconds. A fresh terminal's startup output does not trigger
a waiting notice before you run a command or launch an agent in it.

**Quiet does not necessarily mean finished or successful.** An agent may be
thinking or asking for input. Read the pane's output to confirm its state. The
default quiet period is 10 seconds; increase **Quiet seconds before badge** in
**Settings → Agents** if an agent is being flagged during normal pauses. That
threshold also applies to waiting notices.

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

Prompts are long, and typing them is the slow part. TermHQ's dictation types
into the terminal you started it in, so you can talk a prompt at an agent and
edit it before sending — and click over to another pane while it transcribes
without the words following you. Opt in to **Hold to talk** and holding the
space bar for a moment is the whole gesture, the way Claude Code's own
dictation works, for every program; rebind it to a key of its own (Right Ctrl,
say) and Claude Code's keeps working beside it.

Transcription happens on your machine, on a local Whisper model you pick and
download once in **Settings → Voice** (or bring your own) — which matters for
a tool sitting in front of proprietary source. English by default, fifteen
other languages in the same panel. Linux support is pending. The whole feature
has its own page: [Dictation](/docs/dictation/).

## Keeping their keystrokes theirs

Agents with full-screen interfaces want chords TermHQ also uses. Ultra focus
hands the terminal every key unmodified; only its own toggle and
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>, which pastes, stay TermHQ's. See
[Keyboard shortcuts](/docs/keyboard-shortcuts/#when-a-terminal-program-wants-the-same-key).
