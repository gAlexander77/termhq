---
title: "Troubleshooting"
weight: 100
description: "Fixes for the problems people actually hit: monochrome agents, missing shells, stale sessions, language servers, unsaved edits, browser panes, and where the logs are."
---

## An agent or CLI renders without color

Almost always an inherited `NO_COLOR` from whatever launched TermHQ. TermHQ
scrubs the variables it knows about on every shell it starts, so if color is
still missing, check your shell profile — a `NO_COLOR`, `TERM=dumb` or
`CLICOLOR=0` set there is applied after TermHQ hands the shell over, and TermHQ
cannot override your own configuration.

Confirm with:

```bash
echo "TERM=$TERM NO_COLOR=$NO_COLOR COLORTERM=$COLORTERM"
```

## An installed agent is missing from the menu

Open **Settings → Agents** and find its row. A built-in launcher TermHQ has not
found waits under the list, folded into **Built-in agents not detected**; one
you removed comes back from **Restore removed agents**. Then read what the row
says:

- ***not on PATH*** — TermHQ can't find the program. Press the refresh button
  beside **Add agent** to look again; on macOS it also asks your login shell
  for its `PATH` again, so a folder an installer just added is seen without a
  restart. If it's still missing, check that your terminal finds it (`where
  gemini` on Windows, `which gemini` elsewhere), or put the program's full path
  in the command of a launcher of your own — **Add agent** makes one.
- ***not verified*** — a program with that name exists, but it isn't the
  product the launcher is for: `agent` might be Grok's rather than Cursor's,
  or `copilot` AWS's rather than GitHub's. Hover the status for what TermHQ
  found. If the right one is installed under another name or path, put that
  in the command of a launcher of your own — **Add agent** makes one.

If the agent starts from TermHQ's menus but typing its name in a terminal gets
an unknown-command error, that terminal was open before the install and its
shell still has the old `PATH`. Open a new terminal, or keep launching the agent
from TermHQ, which types its full path there.

## The Open in IDE button is missing

The `</>` button in a terminal's header, and **Open in IDE** in the app's menus,
open the editor chosen in **Settings → Agents → Open in IDE**. They are left out
while that choice has nothing to open:

- **Automatic (no IDE found)** — none of the
  [editors TermHQ recognizes](/docs/agents/#directory-awareness) is installed
  where it looks. Install one and press the refresh button under the picker,
  or choose **Use IDE command…** and enter the command that starts your editor.
- **(not found)** beside the editor you picked — it is no longer where TermHQ
  found it, and TermHQ does not swap in a different one. Pick another, or press
  the refresh button once it is back.

An [SSH pane](/docs/ssh/) never has the button: its folder is on the far host.

## I cannot find the waiting-pane list

The waiting item in the bottom status bar is hidden when there are no waiting
notices. Enable **Settings → Agents → Show waiting panes in the status bar**,
then **Always show it, even when nothing is waiting** if you want it visible all
the time — it then reads **0 waiting** while the list is empty. An empty list
says **Nothing waiting right now.**

Not every quiet terminal raises a notice: fresh startup output, short commands,
and work you watched happen are ignored. Only a pane out of sight counts — one
behind another pane's maximize, or on the stash shelf. A pane on screen never
does, focused or not. If TermHQ was in the background when
the pane went quiet, it also sends a native OS notification, and the waiting
entry is recorded either way. If those notifications are missing, check your
operating system's notification permissions and Do Not Disturb settings as well.

Waiting notices do not time out. Leaving the maximize clears the ones for the
grid, and opening the stash shelf clears the stashed ones. Otherwise, return to
the pane, or use the notice's **×**
— or **Dismiss all** — to clear them. Dismissing a notice does not stop the
command. If an agent is flagged during a normal pause, increase **Quiet seconds
before badge** under **Settings → Agents**. See
[When a pane needs your attention](/docs/agents/#when-a-pane-needs-your-attention).

## A shell is missing from the list

TermHQ detects shells at startup. Something installed afterwards appears after a
restart.

On Windows, WSL distributions are listed individually; a distribution that is
installed but not yet initialized will not appear until it has been run once.

## Vim's shortcuts trigger TermHQ actions

On Windows, <kbd>Ctrl</kbd>+<kbd>B</kbd> toggles TermHQ's sidebar by default,
but Vim uses it to page backward in normal mode. Similarly,
<kbd>Ctrl</kbd>+<kbd>F</kbd> opens TermHQ's find instead of paging forward in Vim.

Rebind or clear the corresponding TermHQ actions in **Settings → Shortcuts**,
or turn on **Ultra focus** with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> to
pass shortcuts through to Vim. Press the same shortcut again to leave Ultra focus.

On macOS, the sidebar and find use <kbd>⌘</kbd>, leaving Vim's
<kbd>Ctrl</kbd> shortcuts available. For other conflicts and Ultra focus
behavior, see [Keyboard shortcuts](/docs/keyboard-shortcuts/#when-a-terminal-program-wants-the-same-key).

## My terminals did not come back

Terminals survive quitting TermHQ, but not everything:

- **A restart or shutdown** ends them. Nothing survives that — you get your
  panes and directories back, at fresh prompts.
- **Installing an update** restarts the shells too. Your panes return, but
  running commands and agents need to be started again.
- **A program that exited on its own** — an agent that finished, a build that
  ended — is gone because it ended, not because TermHQ lost it.
- **Turning off "Keep shells running after close"** (Settings → Workspaces) makes
  closing a window end its terminals deliberately.
- **An SSH pane** whose `ssh` process is gone — after a restart, say — comes
  back in its place reading **Not connected** until you reconnect — see
  [SSH connections](#ssh-connections).

If panes come back but look emptier than you left them, the terminals are fine —
only recent output is kept, and a chatty program pushes the rest out.

## Everything vanished right after a crash

Relaunching within about fifteen seconds of a crash can open a fresh, empty
workspace instead of the one you lost.

**Your work is not gone.** The terminals are still running. Quit and open TermHQ
again, or open a second window, and they are adopted back.

## TermHQ shows an error recovery card

Choose **Reload**. The card replaces the old blank-screen failure mode and
includes the error details needed for a useful bug report. Your shells remain
safe in the background while the interface reloads.

If the card appeared while previewing an imported theme, TermHQ normally keeps
the last theme that applied successfully. Include the card's details when
reporting the theme that triggered it.

## TermHQ says your settings file couldn't be read

`config.json` held something TermHQ could not read past — usually a typo in a
hand edit, or a value of the wrong type. TermHQ started with default settings,
kept your file as `config.json.broken-` followed by the UTC time, and says so in
a notice that quotes the error, line and column included. Your favorites,
agents and shortcuts are in that copy, not lost.

1. Choose **Open folder** to see the copy.
2. Quit TermHQ.
3. Fix what the error points to and save the corrected file as `config.json`.
4. Start TermHQ again.

**Dismiss** only hides the notice. A different message, **Settings weren't
saved** with **Retry**, means a write failed rather than a read: your change is
active in the window, and **Retry** saves it. See
[Configuration](/docs/configuration/#an-unreadable-file-is-kept).

## Output looks mangled after resuming

Usually a width mismatch: a shell drew its prompt at one size and came back at
another. TermHQ restores each pane at the size it was to avoid this, but a shell
with an unusual prompt can still be confused by it.

Pressing <kbd>Enter</kbd> to redraw the prompt fixes the display. `clear` fixes
it thoroughly.

## A link in a terminal does not open

A plain click only focuses the pane. <kbd>Ctrl</kbd>+click a link
(<kbd>⌘</kbd>+click on macOS) to open it in your default browser, or add
<kbd>Shift</kbd> to open it in a browser pane beside the terminal — hovering a
link shows the same hint. Only `http` and `https` links open, and each is handed
to the operating system as an address, never run as a command.

A program can also print its own links (OSC 8), such as the file links Claude
Code gives its edits. <kbd>Ctrl</kbd>+click opens a file with its default app and
a folder in the file manager; <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+click shows a file
there instead. Anything that would run, such as a program, a script or a
shortcut, is only shown, never run. Tools print these links only where they
expect the terminal to follow them, so TermHQ sets `FORCE_HYPERLINK=1` in every
shell.

## Right-click shows a menu instead of pasting, or the reverse

On macOS a right-click opens a menu — Copy, Paste, Select all, Clear and Find.
Elsewhere it copies the selection if there is one and pastes otherwise, the
Windows console habit. **Settings → Terminal → Right-click in a terminal** picks
either behavior on any platform.

In a program that reads the mouse — full-screen Claude Code, Codex, vim, tmux —
the right-click belongs to the program, whatever that setting says. Hold
<kbd>Shift</kbd> (<kbd>Option</kbd> on macOS) to have TermHQ take it.

## A large paste asks for confirmation or takes time to appear

Pastes over **5 KiB** ask first by default. Choose **Paste anyway**, or use
**Settings → Terminal → Warn before large pastes** to turn this warning off.
The card's **Don't ask again** link asks you to confirm that change before
turning it off and pasting. **Confirm multi-line pastes** is separate and can
still ask if you enabled it.

Once accepted, a paste can take time for the program inside the terminal to
process. Turning the warning off skips the question; it does not change that
program's processing speed. See [Copy and paste](/docs/getting-started/#copy-and-paste).

## Move to workspace is missing or a move is refused

Open a second workspace window, then right-click the terminal or editor's
header. A saved workspace whose window is closed is not a destination.
Browser panes do not offer this action.

If the destination is busy or closes during the handoff, the source pane
stays in place. Try again when the destination is ready. An editor move also
stops when the destination has different text for one of the same files;
resolve those copies before trying again. Recent terminal output transfers,
but older scrollback and editor undo history do not. See
[Moving a pane](/docs/workspaces/#moving-a-pane-to-another-workspace).

## Dictation does nothing

If there is **no mic button at all**, no speech model is installed yet — that
is the intended off state, not a bug. Open **Settings → Voice**, download a
model (or import your own), close Settings, and the button appears. The panel
says at the top whether dictation can run on this build at all and whether a
model is ready, before it offers anything to download.

If the button is there but nothing comes out, use **Settings → Voice → Test
microphone**: it records a few seconds and plays them back through the same
capture path dictation uses. A silent clip means the operating system is not
giving TermHQ any audio — check the microphone permission for TermHQ in your
system settings, and the **Microphone** setting in **Settings → Voice** if you
have more than one. The mini-waveform beside the mic button tells the same story
live: it scrolls with real input, so a flat line means no audio is arriving.

On macOS the permission matters twice over: without it, microphones do not
enumerate at all, so the device list comes up empty rather than wrong.

When dictation cannot start or finish, the status bar says why; hover the
notice for the fix:

- **Dictation: The microphone is blocked** — allow microphone access for TermHQ
  in your system's privacy settings, then try again.
- **Dictation: No microphone was found** — plug one in, or pick another in
  **Settings → Voice**.
- **Dictation: The microphone is busy** — another app may be holding it; close
  that app, then try again.
- **Dictation: No speech model is installed** — download one in
  **Settings → Voice**.
- **Dictation: Transcription failed** — the hover text carries the
  transcriber's own reason.
- **Dictation: No speech detected** — the recording completed but contained
  no recognized words. Speak before releasing the hold key, or check the level
  with **Settings → Voice → Test microphone**.
- **Nothing to dictate into** — the words need somewhere to go. Focus a
  terminal, or click into a text field, then start dictation.

**Linux support is pending.** See [Installation](/docs/installation/#linux).

If it hears you but the words come out wrong, check the **dictation
language** in Settings → Voice — and note that models labeled *English only*
stay English whatever the language is set to; only multilingual models follow
it.

If the words landed in a different pane than you expected: they go to the
terminal you started dictating in, whatever you clicked since. The full feature
— starting it, Hold to talk, the cursor — is on the
[Dictation](/docs/dictation/) page.

## My language server is not doing anything

TermHQ ships no language servers — they are programs you install yourself. Open
**Settings → Editor**, expand **Language server setup** (it starts collapsed),
and read the status chip beside the one you expect:

- **not installed** — the command is not on your `PATH`. Install it; pressing
  Restart will not help, which is why the chip keeps saying this.
- **would not start** — it is installed but failed. **Hover the chip** for why
  the launch failed, and use **Logs** for the server's own output.
- **starting…** for a long time — a large project on first open, usually. Rust
  and TypeScript both index before they answer.
- **restarting…** — it crashed after running; a fresh launch follows in a
  moment, and **Logs** has what it said on the way out.
- Nothing at all — check the **Language intelligence** master switch, and that
  the entry itself is enabled.

See [Language servers](/docs/language-servers/) for the whole picture.

## Format on save is not formatting

Formatting comes from your language server, not from TermHQ — so a language with
no server installed has no formatter. Check the server's status under
**Settings → Editor → Language server setup** first.

If a server *is* running and you are getting a different result than you expect,
the first ready server in the list that offers formatting is the one that owns
it. Settings cannot reorder that list: its order is the `languageServers` array
in `config.json`, so move an entry earlier there — with TermHQ closed — to hand
it formatting. Format on save also gives up after two seconds rather than making
you wait on a slow formatter.

## A file I am editing changed on its own

That is an agent, a formatter, or a `git checkout` — and it is handled rather
than ignored. With no unsaved edits the tab reloads quietly, keeping your cursor
and undo history. With unsaved edits you get a card offering **Compare**,
**Reload from disk** or **Keep my changes**. Nothing is overwritten without you
picking one.

## I lost unsaved edits

Two different cases:

- **After a crash or power cut**, you should not have. Reopen the file and the
  tab comes back still unsaved. If it did not, check **Settings → Editor →
  Recover unsaved changes after a crash** — and note that text over 4 MB is never
  mirrored.
- **After quitting normally**, unsaved buffers are deliberately not kept. Quitting
  with unsaved work stops and asks first, so *Quit without saving* is the only way
  past it.

## A browser pane looks frozen

Almost certainly it is — deliberately, and only while something covers or moves
it, or part of it is out of view. A [browser pane](/docs/browser-panes/) is a
native surface that the interface cannot paint over, so whenever a modal, menu,
or drag preview needs the space, or the panes glide into new places, the pane
shows a still frame of the page until the overlay goes away or the pane lands.
Audio and video keep running underneath. Opening the waiting-pane list,
closed-pane list or stash shelf has the same effect. Their buttons in the status
bar do not freeze the page while those lists are closed.

A grid with more panes than fit the window scrolls, and while it does, each
page rides along as its still frame and goes live once the scrolling stops. A
pane left partly out of view stays on its still, cropped where the page really
is, until you click it: the click scrolls the pane into view and the page goes
live. A still is taken when the page loads, resizes or comes back into view, so
after you scroll or type inside a page, its still can briefly show it as it was.

Sometimes you get the plain background instead of a still frame: a pane nobody
can see does not pay to capture one, a second overlay arriving right behind the
last does not wait for a new one, and a page shown only a moment ago has none
yet when its pane glides. Each goes live again the moment the overlay goes or
the pane lands.

If nothing is covering it and it is still frozen, reload the page from the
pane's reload button.

## A browser pane's mute button does nothing

Muting works on Windows, and on macOS where the system's WebKit supports page
audio control. On a macOS version without it, pressing the speaker shows an
error in the pane saying page audio control is unavailable, and **Settings →
Browser → Sound in new panes** cannot start a pane muted there either.

## My shortcuts do nothing while a web page is focused

TermHQ's chords work over a focused page on Windows and macOS, except a short
list the page keeps for itself: find (<kbd>Ctrl</kbd>+<kbd>F</kbd>, or
<kbd>⌘</kbd>+<kbd>F</kbd> on macOS), page zoom and copy, plus the agent picker
and dictation, which only make sense in a terminal — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/#when-a-browser-pane-has-focus).
If every chord seems dead, check for **Ultra focus**: while it is on, the page
gets every key except Ultra focus's own chord.

## My background does not show

Read what **Settings → Appearance → Background** says under the tiles:

- **could not be shown here: the webview cannot decode it** — your system's
  webview cannot play that file, so the grid stays plain. MP4 (H.264) and WebM
  play everywhere; PNG, JPEG, WebP and GIF always show. Convert the file, or
  choose **Try again** after a passing failure.
- **is no longer in the backgrounds folder, so nothing is shown** — the file was
  deleted or renamed in `backgrounds/`. Pick another, or add it again.

A file over 1 GB is refused when you add it, with its size in the message.

On macOS a GIF plays at its own pace, which is why it gets no **Speed** row
there; videos follow Speed on both platforms. And terminal text a touch softer
while a background is set is expected: the terminal draws on a see-through
surface then. Choose **None** and it is sharp again.

## SSH connections

The whole feature is on the [SSH connections](/docs/ssh/) page.

- **There is no Connect via SSH.** SSH is off until you turn on **Settings → SSH
  → SSH connections**. Until then the **+** button's shell list has no SSH row,
  and the command palette lists **Connect via SSH** but refuses it, saying where
  to turn it on.
- **No OpenSSH client was found.** TermHQ uses the OpenSSH client already on
  your machine and installs none. On Windows, add Windows' own client (Settings →
  Apps → Optional features → OpenSSH Client), or install Git for Windows, which
  carries another. macOS includes one at `/usr/bin/ssh`. For a client somewhere
  else, choose **A path…** under **Settings → SSH → OpenSSH client**.
- **ssh ended with code 255.** That is OpenSSH's code for any connection or
  authentication failure alike — a refused connection, an unknown host, a
  rejected key or password. The output above the card says which. The card also
  shows the exact command the pane ran (hover it for all of it), and
  **Reconnect** — or <kbd>Enter</kbd> in the pane — tries again.
- **Idle connections drop.** A NAT or a firewall can drop a quiet connection
  without a word. **Settings → SSH → Keep idle connections alive** sends a
  keep-alive every 30 seconds by default; set to off, your ssh config's own
  `ServerAliveInterval` decides.
- **My `ssh_config` aliases are missing.** The picker lists concrete `Host`
  entries only; wildcard patterns and `Match` blocks are left out. The line
  under **Settings → SSH → OpenSSH client** names the config file they come
  from, or says it was not found.
- **My keys work in one terminal but not in TermHQ (Windows).** Windows OpenSSH
  and Git for Windows's client do not share keys, agents or config. The client
  chosen in **Settings → SSH** is the one in play; pick the other if that is
  where your keys live.
- **An SSH pane says Not connected after a restart.** By design: restoring a
  workspace puts the pane back in its place without connecting, so a workspace
  with several remote panes does not open with a pile of password prompts.
  Press <kbd>Enter</kbd> or **Reconnect** when you want it. A pane whose `ssh`
  was still running in the background comes back connected.
- **My saved profiles are gone.** If `ssh-profiles.json` cannot be read — a hand
  edit gone wrong, or a file from a newer TermHQ — the picker says so and leaves
  the file exactly as it is. Typed targets still connect, and nothing is written
  over it.

Passwords, passphrases and host-key questions are OpenSSH's own and appear in
the pane; you answer them there.

## There is nothing to grab between my panes

Check **Settings → Appearance → Resize panes by dragging**. Off is a supported
state — equal shares and no handles — and it is remembered per machine, so a
config carried from elsewhere can arrive with it already off.

## My pane sizes keep resetting

By design, and only on one trigger: opening or closing a pane — including
stashing one or bringing it back — puts every boundary back to equal. A
hand-tuned layout describes a particular set of panes, so it is not carried
onto a different one. Moving, swapping, growing, arranging and resizing the
window all leave your proportions alone, and a workspace keeps them across
restarts. See [Resizing panes](/docs/panes-and-layout/#resizing-panes).

To level the grid *deliberately*, use the reset button that appears in the title
bar beside the layout switch whenever a pane is off its equal share, or the
**Reset pane sizes** action — unassigned by default, so run it from the command
palette or bind it in **Settings → Shortcuts**. To even up just one pair,
double-click the boundary between them, or <kbd>Tab</kbd> to it and press
<kbd>Enter</kbd>.

## Windows warns about the installer

SmartScreen warns on the first install of a build that is not code-signed. See
[Installation](/docs/installation/).

## Source Control says it cannot read a WSL repo

Repositories on a `\\wsl.localhost` path are not supported by Source Control yet,
and it says so rather than showing you something wrong. Git inside the WSL pane
itself works normally.

## A checkout is missing from Worktrees

Open **Settings → Git → Worktree roots** and confirm the folder is still listed.
The tracker looks for checkouts up to two levels beneath each configured root;
it does not crawl outside them. Add a closer root if the checkout is nested more
deeply, then open the [Worktrees](/docs/worktrees/) view and choose **Refresh**.

If a configured root moved or is no longer available, the Worktrees view keeps
the item visible and shows the reason instead of silently dropping it.

## Worktrees says it could not read some checkouts

A tinted line above the list says how many checkouts a scan could not read. Git can
refuse a checkout because another user account owns it, its folder is gone, or
there is no permission. Open the line's chevron to see each folder's reason in
plain words, the fix for git's ownership refusal (`safe.directory`) and git's own
messages. If you do not want those folders, choose **Stop scanning these**. They
are left out of every scan from then on and cost no git process. **Settings →
Git → Worktree roots** lists them under **Not scanned**, each with **Scan again**.
The × hides the line until the folders it lists change, and the header's
**N not read** brings it back.

## A status-bar message disappeared

A notice with nothing to retry, such as a dictation error, leaves the status bar
on its own after 8 seconds. Hover it to keep it up. One with **Retry** stays until
you use it or dismiss it.

## An update cannot finish

Open **Settings → General → Updates** to read the result and use **Check now**
or retry **Update and restart**. Automatic checks stay quiet when you are
offline; a manual check reports the connection problem.

A failed download or signature check leaves your running session in place.
If another TermHQ window is still open, switch to it and answer any unsaved-file
prompt before retrying. A workspace-save failure also stops installation before
shells are shut down.

An installer failure after shutdown is different: TermHQ restores terminal
availability, but commands that stopped are not resumed. Review the error and
your work before trying again. See [Updating](/docs/installation/#updating).

## Where the log is

`pty-host.log`, directly inside the configuration directory
([Configuration](/docs/configuration/)). Attach it to any bug report about
terminals not starting, dying, or failing to come back.

It starts empty whenever a new background host starts — after your computer
restarts, after an update, or after a quit that left no shells running. With
**Keep shells running after close** on, relaunching TermHQ reconnects to the
same host and the log carries on. Grab a copy **before** anything restarts the
host if you are chasing something that happened in a previous run.

## Reporting a bug

Open an issue on [GitHub](https://github.com/gAlexander77/termhq/issues) with:

- your operating system and version
- your TermHQ version (**Settings → General → Updates** shows it)
- what you expected, and what happened instead
- `pty-host.log`, if it involves terminals not behaving
