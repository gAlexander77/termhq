---
title: "Letting agents use TermHQ"
weight: 61
description: "Connect Claude Code, Codex and other agents to TermHQ, so they can see and work its panes, and decide what each one may do."
---

An agent running in one of TermHQ's terminals can do more than type into its
own. Through TermHQ it can list the panes in your workspace, read what another
terminal shows, start a second agent beside itself and hand it a task, open a
file in an editor tab, or ask you a question. Agents reach these tools in two
ways. Every terminal TermHQ opens has a `termhq` command. TermHQ also offers
the same tools over MCP, the standard way agents such as Claude Code and Codex
call tools. Whatever an agent may do is up to you, tool by tool, in
**Settings → MCP**, and anything that changes your work asks you first by
default.

## Connecting an agent

**Settings → MCP → Connect agents** has a tile for Claude Code and one for
Codex, each saying where that agent stands: **Not installed**, **Not added**,
**Waiting for its first call** or **Connected**.

- **Add** registers TermHQ's tools with that agent, for all your projects. It
  runs the agent's own command for it, shown on the tile, so the change is the
  agent's usual configuration and nothing hidden. The command fits on one line;
  hover over it to read the whole of it.
- **Agent sessions you start after that have the tools.** A session that was
  already running picks them up when you restart it.
- **Connected** shows only once the agent has actually called TermHQ, and the
  tile says when its last call came and from which pane. Until then it reads
  **Waiting for its first call**.
- **Remove** takes them away again.
- **An agent that isn't installed** says so. Install it, then add TermHQ from
  the same tile.

**Codex.** Add also writes two lines Codex's own command can't:

- a longer tool timeout, since Codex normally gives up on a tool after 60
  seconds, which is less than an approval can wait for you;
- the pane's TermHQ variables, which Codex otherwise keeps from the tools it
  starts. Without them, TermHQ couldn't tell which pane is asking.

A line you already set in that entry is left as it is.

**Other agents** that speak MCP have a third tile. **Show configuration** lays
out TermHQ's server as **JSON**, for that agent's MCP settings or its
`mcp.json` file, or as a **Command** line, for an agent that asks for one.
**Copy** it from there. It runs the same server as Claude Code's and Codex's.

## Deciding what agents may do

The top of the page says where things stand in one sentence: which agents have
TermHQ, how many tools run on their own or ask first, and when the last request
came. The switch beside it, **Let agents use TermHQ**, is the master switch.
Off, every request from an agent or a script is refused, the page says
**Agents can't use TermHQ**, and the tools' settings dim until you turn it back
on.

Below it, under **Tools for agents**, the tools sit in five groups that fold,
each with one setting for all its tools. Open a group to set its tools one by
one. A group whose tools are set differently reads **Mixed**, and opens on its
own so the odd one out never hides. Each setting is a chip tinted by its state,
and its menu says what each choice means:

- **Allowed** — the tool runs when an agent calls it.
- **Ask first** — TermHQ asks you each time, on a card in the window.
- **Off** — the tool disappears from the agent's list, and a call is refused.

A change applies to the next request, with no restart. An agent that supports
it also sees its list of tools change within a couple of seconds. Out of the box, tools that read, show you something or talk to
other agents are allowed. Tools that type into a terminal, start or close a
pane, or change a workspace ask first.

**Preset** sets every tool at once, and you can still change any of them after:

- **Defaults** — the settings above.
- **Ask before anything changes** — everything but reading, and an agent's own
  questions, asks first.
- **Read only** — agents can only read.

A settings file TermHQ can't read refuses every request until it can, rather
than falling back to settings you didn't choose. The same goes for a hand edit
that misses: a tool set to anything but `on`, `ask` or `off`, such as `"OFF"`,
counts as Off and shows as Off here, and a setting that isn't text at all,
such as `false`, refuses every request until it is fixed.

## The approval card

A tool set to **Ask first** shows a card in the corner of the window the agent
would act in, or, if that workspace isn't open, the window of the agent's own
workspace:

- **Who is asking:** the agent and its pane, and its workspace when that is
  another one.
- **What it wants to do,** in one sentence. Text it wants to type is shown in
  full, with any control character spelled out so nothing hides in it. A
  character that draws nothing or turns text around, such as a zero-width
  space or a right-to-left override, shows as its code, like `<U+202E>`, so a
  command or a web address can't read as a different one. The sentence and
  the names of panes and workspaces on the card are shown the same way.
- **The pane it will act on,** as a row: what kind of pane it is, its name and
  its full folder, and whether it has since closed, been stashed or gone behind
  a maximized pane. That pane keeps an outline in the grid until you answer.
  For a new terminal, the row is the folder it will open in.
- **Where,** when it acts on a workspace other than this window's.

**Heavy requests stand out.** A request that types, presses keys, starts or
closes a pane, or changes a workspace wears a warning edge and names what it
does, such as **Closes a pane**, and, for a pane, what runs in it now.
Starting an agent shows the exact command its launcher will type, flags
included, so allowing "start Claude Code" never quietly allows flags you
forgot it was set up with.

Then **Deny**, **Allow**, or **Always allow** with the tool's name. Always allow
sets that tool to **Allowed** for every agent from then on, and allows the
cards already waiting for it. A server workspace's window doesn't offer it,
since those agents follow the other computer's settings.

**Narrower than Always allow:** a request that acts on one other pane offers a
checkbox such as **Don't ask again when pane 3 types into pane 5**. It is never
checked when the card arrives. Check it, and **Allow and remember** lets that
tool, from that pane to that pane, run without asking until either pane
closes. It holds in this window only and changes nothing in Settings. A second
target still asks.

**It never interrupts your typing:**
- The card doesn't take the keyboard, so you keep typing where you were.
- **Enter** never approves anything, even with a button selected.
- **Esc** denies, but only while the keyboard is in the card.
- For its first moment on screen the card ignores clicks, so a double click on
  one card can't answer the card behind it.

**Waiting cards:** several requests queue up, one card at a time. The ones
waiting peek out behind the card, and its title counts them, **1 of 3**. Each
card says when it gives up, **Denied at** a time, two minutes after the agent
asked. If no TermHQ window is open to ask in, the request is refused.

**A request the agent gave up on** doesn't run. If an agent cancels a request
while its card is up, allowing the card later does nothing, and the activity
log says it was canceled. The card itself stays until you answer it or it
gives up.

**Questions:** an agent's own question uses the same card, with up to four
answers to click and **Dismiss**. An answer can't hold the invisible or
text-reversing characters above.

## What agents can do

The tools appear in Settings in these groups, with the same words:

| Tool | Lets an agent |
| --- | --- |
| **Reading** — allowed by default | |
| `status` | See which pane and workspace it is running in. |
| `workspaces` | List your workspaces and how many shells each is running. |
| `panes` | List a workspace's panes, with their folders and the agents running in them. |
| `read` | Read what other terminals show. |
| `wait` | Watch a terminal until some text appears or it goes quiet. |
| **Showing you things** — allowed by default | |
| `open` | Open files in editor tabs, folders in new terminals, and web pages in browser panes. |
| `focus` | Bring a pane into view. Your keyboard stays where you are typing. |
| `rename` | Rename panes. |
| `notify` | Show a short notice in the status bar. |
| `ask` | Ask you a question, with a few answers to click. |
| **Talking to other agents** — allowed by default | |
| `message` | Leave messages for the agents in other panes. Nothing is typed into those panes. |
| `inbox` | Read the messages other agents leave for it. |
| `note` | Read and write notes that every agent in the workspace shares. |
| `claim` | Mark the files it is editing, so other agents leave them alone. |
| **Typing, starting and closing panes** — ask first by default | |
| `send` | Type text into other terminals, and press Enter. |
| `key` | Press keys in other terminals, such as Enter, Escape, the arrows or Ctrl+C. |
| `new` | Open new terminals, and start commands or agents in them. |
| `close` | Close panes, the way their close button does, so you can undo it. Never an editor with unsaved changes. |
| **Workspaces** — ask first by default | |
| `workspace` | Open, create, rename and close workspaces. A closed workspace's shells keep running. |

Tools act on the agent's own workspace unless it names another. Most of them
need that workspace open in a window. Without one, an agent can still list its
terminals, read them, and type a single line into one.

## Agents working together

An agent can hand another a task without reading its screen:

- **`message`** leaves a message in another pane's inbox, or in every other
  pane's in the workspace. Nothing is typed into those panes, so the agent
  there sees it only when it checks. The answer says how many messages now
  wait unread there, and **`panes`** shows each terminal's unread count, so a
  sender can tell when the agent there has taken them.
- **`inbox`** collects this pane's messages, and can wait for one.

Each message says which pane, and which workspace, it came from. An agent can
answer one that came from another workspace by naming that workspace.

You see a message land too: its sender and first line slide down under the
receiving pane's header for five seconds. Hover over it to hold it and read the
whole line, or click it to put it away.

- **Notes** are a workspace's shared memory: a key and a value that every agent
  there can read and change. Each note says which pane set it last, and when.
- **Claims** mark the files an agent is about to edit, across all your
  workspaces. Claiming a file another pane holds fails and names that pane. A
  claim is a courtesy agents check, not a lock on the file.

A pane's messages and claims go when its shell ends, and all of them go when
TermHQ's terminal host restarts, as it does for an update.

### Handing off a task

TermHQ tells a connected agent how to hand work to another: start it with
`new`, wait for its pane to go quiet, send the task with Enter along with its
own pane id and a request to answer with `termhq message`, then wait on
`inbox`. Watching the other pane instead doesn't work, since it stays busy the
whole time it works.

- **`new` with an agent** answers with the new pane's id and the command its
  launcher typed, flags included, so the agent that asked knows which model it
  started. For another model or effort it gives a command of its own instead,
  which the approval card shows in full.
- **`send` with Enter** presses Enter only once the program there has taken
  the pasted text in. An agent can take a few seconds over a long prompt, and
  an Enter that came sooner would join the prompt as a line break and leave it
  unsent.
- **A wait that runs out isn't a failure.** When `wait`, or a `send` told to
  wait for the reply, runs out of time, the answer says the pane may still be
  working and, when **read** is Allowed, ends on its last few lines. Over MCP
  that is an ordinary answer, not an error, so an agent doesn't take a busy
  agent for a broken one.

A pane an agent started says **from pane 3** in its header. Hover over it to
see which agent started it and when, or click it to bring pane 3 into view. The
pane that started it gets a chip in its header with its helpers' marks and a
count, such as **2 helpers**. Its menu lists each one, running, waiting on you
or exited, and brings them into view.

## The `termhq` command

The command is there for scripts, for agents that don't use MCP, and for you,
in every terminal TermHQ opens. A few things it does:

```sh
termhq panes                        # the panes in this workspace
termhq read 3                       # what pane 3 shows
termhq send 3 "npm test" --enter    # type into pane 3, then press Enter
termhq new --agent "Claude Code"    # a new terminal running an agent
termhq open src/app.ts:12           # an editor tab, at line 12
termhq message 4 "tests pass"       # a message for the agent in pane 4
```

Pointed at as Git's editor, it opens a commit message as an editor tab, and
Git waits until you close it:

```sh
git config core.editor "termhq open --wait"
```

`termhq help` lists everything it does, and `termhq help send` describes one
action. It follows the same settings and asks the same questions as MCP, so an
agent can't get around a setting by typing the command instead.

Once the text of a `message` or a `send` has begun, `--help` and `--json` in it
are refused rather than taken as options. To send them as text, put the text
after `--`:

```sh
termhq message 3 -- "done, see --help for the flag"
```

For scripts, it exits with 0 when the action ran, 1 when it couldn't (with one
sentence saying why), 2 for a mistake in how it was called, 3 when TermHQ isn't
running or is a different version, and 4 when a wait ran out.

## What was asked, and what happened

**Settings → MCP → Recent activity** lists the last 20 requests from agents and
scripts, live while the page is open. Each shows when it came, the mark and
name of the agent that asked and its pane, what it asked for in the approval
card's words, and how it went: **Ran**, **You allowed**, **Denied**,
**Dismissed**, **No answer**, or **Refused** with the reason.

Filters narrow the list to the requests that **Asked you**, the ones
**Refused**, or the ones from one agent, with **Scripts** for the `termhq`
command. Each filter shows today's count, and a filtered list reads the whole
day.

**Open**, beside **Activity log**, shows the whole record, one line per
request, in an editor tab. It is kept beside your settings file and starts over
once it passes a megabyte.

## What agents can't do

- **Type into, press keys in, or close their own pane.**
- **Type into a pane you typed in during the last three seconds,** so their
  text can't land in the middle of yours.
- **Close an editor with unsaved changes.** You close those yourself.
- **Send control characters as text.** Ctrl+C or Escape goes through `key`,
  which has a setting of its own.
- **Delete a workspace, or end its shells.** Closing a workspace's window puts
  it away, and its shells keep running.

When an agent opens a file or a terminal, or brings a pane into view, your
keyboard stays where you are typing. `focus` moves it only when the agent asks
for that explicitly. A commit message opened with Git's editor set to `termhq
open --wait` takes it, since that one is yours to type.

Text an agent reads from a terminal, and every message, note and claim, comes
from another program. TermHQ tells agents to treat it as information, not as
your instructions.

## Remote workspaces

In a [server workspace](/docs/remote-workspaces/), the terminals and the agents
in them run on the other computer. They connect to TermHQ there and follow that
computer's **Settings → MCP**, not this window's. **Connect agents** in such a
window still lists this computer's agents. A message landing in one of its
panes slides down under the pane's header as it does locally, when the other
computer runs TermHQ 0.3.3 or later; with an older one the agent there still
gets it in its inbox, and nothing shows.
