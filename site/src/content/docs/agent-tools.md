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

**Settings → MCP → Connect agents** has a row for Claude Code and one for
Codex:

- **Add** registers TermHQ's tools with that agent, for all your projects. It
  runs the agent's own command for it, shown under the button, so the change is
  the agent's usual configuration and nothing hidden.
- **Agent sessions you start after that have the tools.** A session that was
  already running picks them up when you restart it.
- **Remove** takes them away again.
- **An agent that isn't installed** says so. Install it, then add TermHQ from
  the same row.

**Codex.** Add also writes two lines Codex's own command can't:

- a longer tool timeout, since Codex normally gives up on a tool after 60
  seconds, which is less than an approval can wait for you;
- the pane's TermHQ variables, which Codex otherwise keeps from the tools it
  starts. Without them, TermHQ couldn't tell which pane is asking.

A line you already set in that entry is left as it is.

**Other agents** that speak MCP take the snippet under the rows. Copy it into
that agent's MCP settings or its `mcp.json` file. It runs the same server as
the two rows above.

## Deciding what agents may do

**Let agents use TermHQ**, at the top of the page, is the master switch. Off,
every request from an agent or a script is refused, and the tools' settings
dim until you turn it back on.

Below it, every tool has its own setting:

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
than falling back to settings you didn't choose.

## The approval card

A tool set to **Ask first** shows a card in the corner of the window the agent
would act in, or, if that workspace isn't open, the window of the agent's own
workspace:

- **Who is asking:** the agent and its pane, and its workspace when that is
  another one.
- **What it wants to do,** in one sentence. Text it wants to type is shown in
  full, with any control character spelled out so nothing hides in it.
- **Where,** when it acts on a workspace other than this window's.

Then **Deny**, **Allow**, or **Always allow** with the tool's name. Always allow
sets that tool to **Allowed** for every agent from then on, and allows the
cards already waiting for it. A server workspace's window doesn't offer it,
since those agents follow the other computer's settings.

**It never interrupts your typing:**
- The card doesn't take the keyboard, so you keep typing where you were.
- **Enter** never approves anything, even with a button selected.
- **Esc** denies, but only while the keyboard is in the card.
- For its first moment on screen the card ignores clicks, so a double click on
  one card can't answer the card behind it.

**Waiting cards:** several requests queue up, one card at a time. Each card says
when it gives up, **Denied at** a time, two minutes after the agent asked. If no
TermHQ window is open to ask in, the request is refused.

**Questions:** an agent's own question uses the same card, with up to four
answers to click and **Dismiss**.

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
  there sees it only when it checks.
- **`inbox`** collects this pane's messages, and can wait for one.

Each message says which pane, and which workspace, it came from. An agent can
answer one that came from another workspace by naming that workspace.

- **Notes** are a workspace's shared memory: a key and a value that every agent
  there can read and change. Each note says which pane set it last, and when.
- **Claims** mark the files an agent is about to edit, across all your
  workspaces. Claiming a file another pane holds fails and names that pane. A
  claim is a courtesy agents check, not a lock on the file.

A pane's messages and claims go when its shell ends, and all of them go when
TermHQ's terminal host restarts, as it does for an update.

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

## What was asked, and what happened

**Settings → MCP → Recent activity** lists the last 20 requests from agents and
scripts. Each says what was asked for, when, which pane asked, and how it ended:
ran, denied, no answer, or the reason it was refused. **Activity log** opens the
whole record, one line per request, in an editor tab. It is kept beside your
settings file and starts over once it passes a megabyte.

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
window still lists this computer's agents.
