---
title: "Language servers"
weight: 38
description: "Diagnostics, hover, completion, go-to-definition and formatting in editor panes — from language servers you install, never bundled."
---

An [editor pane](/docs/editor/) on its own gives you syntax highlighting and the
usual editing moves. Point a language server at it and it also gives you:

- **Diagnostics** — errors and warnings as live squiggles
- **Hover** — types and documentation under the pointer
- **Completion** — suggestions that know your project, not just words in the file
- **Go to definition** — cross-file, landing the cursor on the target
- **Parameter hints** — the signature of the call you are inside, with the
  argument you are on underlined
- **Occurrence highlights** — every other place the symbol under your cursor
  appears, reading told apart from writing
- **Formatting** — see [below](#formatting)

## TermHQ ships no language servers

Not as a limitation — as the design. A bundled server is one you cannot upgrade,
one that disagrees with your project's toolchain, and one that ships to everyone
who does not write that language. TermHQ launches the servers **you** install, on
your machine, at your version.

Nothing here is required. With no servers installed, editor panes work exactly as
described on the editor page.

## What is set up out of the box

Five entries ship as *configuration*, ready for the day you install the binary
they name:

| Language | Server | Install it with |
|---|---|---|
| TypeScript / JavaScript | `typescript-language-server` | `npm i -g typescript-language-server typescript` |
| Rust | `rust-analyzer` | `rustup component add rust-analyzer` |
| Go | `gopls` | `go install golang.org/x/tools/gopls@latest` |
| Python | `pyright-langserver` | `npm i -g pyright` |
| C / C++ | `clangd` | Your platform's LLVM package |

Install one and it starts working the next time you open a file of that
language. Install none and nothing breaks.

## Adding your own

Open **Settings → Editor → Language server setup**, then choose **Add a
server**. TermHQ accepts servers that speak the Language Server Protocol over
standard input and output. Each entry has:

- **Command** — the program name on your `PATH`, or its full path
- **Arguments** — space-separated options passed to that program, such as
  `--stdio`. Quoted arguments containing spaces are not supported by this field.
- **Languages** — comma-separated language IDs for the file types it should
  handle, such as `typescript, javascript`
- **Root markers** — comma-separated filenames that mark the top of a project,
  such as `tsconfig.json, package.json`
- **Enabled** — a switch, so you can park one without deleting it

In **Arguments**, **Languages** and **Root markers**, spaces and commas stay in
place while you type. Press <kbd>Enter</kbd>, press <kbd>Tab</kbd> to move to the
next field, or click elsewhere to apply that field's value. There is no separate
Save button.

**Restore default servers** brings the five above back if you have edited them
into a corner.

## How servers start and stop

You do not start them. A server launches when you open a file it handles, and one
runs per project — the project being whatever folder the nearest root marker
sits in, walking upward from your file. A monorepo with three `Cargo.toml` files
gets three, each seeing only its own crate.

A server stops about half a minute after the last file using it closes, restarts
itself if it crashes (at most twice in five minutes, so a server that cannot
start does not spin), and shuts down with the window.

## When a server is not working

Every entry in **Settings → Editor** carries a status chip that tells you the
truth rather than a green light:

| Status | What it means |
|---|---|
| **running · 2 roots** | Working, serving two projects |
| **starting…** | Launched, still coming up |
| **not installed** | The command is not on your `PATH` — install it |
| **would not start** | It is there, but it failed. Hover for its own last words |
| **restarting…** | Recovering from a crash |

**Hover any status for the full story**, including whatever the server itself
said on the way down — "not found on PATH", "no answer to initialize after 30s",
or the exit code that killed it. Each entry also keeps the server's own log,
which is the first thing worth reading when something is wrong.

**Restart** shows its work: a spinner while a relaunch is genuinely in flight,
and a plain answer when there is nothing to relaunch ("cleared — no open file
uses this server yet") rather than a button that looks broken.

One deliberate detail: a missing binary keeps saying **not installed** even after
you press Restart, because the fix is to install it, not to press the button
again.

## Formatting

<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd> formats the document, and
<kbd>Ctrl</kbd>+<kbd>K</kbd> then <kbd>Ctrl</kbd>+<kbd>F</kbd> formats just the
selection. **Settings → Editor → Format on save** (off by default) does it on
every save.

**TermHQ never reformats anything itself.** The request goes to your language
server, so it is `rustfmt` behind rust-analyzer and `gofmt` behind gopls, already
obeying your project's own configuration. There is no formatter of ours in the
middle to disagree with your repo.

### Using a different formatter

The first server in the list that offers formatting owns it. So to format with
Prettier, Black, shfmt or Ruff, add a formatting-only server — `efm-langserver`,
`diagnostic-languageserver`, or `ruff server` — and drag it **above** the
language's main server. That one formats; the main server keeps diagnostics,
hover and completion.

Format on save never waits more than two seconds for a formatter, and never
applies edits computed against a version of the document you have already typed
past.

## When a server wants to change your files

Some servers offer refactors that touch more than the file you are in — a rename
across a project, an import added somewhere else.

When that happens, **the changes land in buffers, not on disk.** Files already
open are edited in place; closed ones open as tabs. Everything arrives unsaved
and undoable, and nothing is written until you save it. **One
<kbd>Ctrl</kbd>+<kbd>Z</kbd> takes back a server's whole edit for a file.**

The edit is all-or-nothing. If anything about it does not fit — a file that moved
on while it was being computed, overlapping changes, a file that will not open —
the whole thing is refused and the server is told why, rather than half a refactor
being applied to your project.

File *operations* — creating, renaming or deleting files as part of a refactor —
are not supported yet, and a refactor that needs one is refused rather than
partly done.

## Turning it off

**Settings → Editor → Language intelligence** is the master switch. Off, no
server ever launches and editor panes behave exactly as they do with nothing
installed.

Individual entries have their own **Enabled** switch, which is the lighter
version of the same idea.

Note that occurrence highlighting keeps working with the whole layer off — it
falls back to matching words rather than understanding symbols, which is worth
more than nothing while a server is missing, disabled, or still starting.
