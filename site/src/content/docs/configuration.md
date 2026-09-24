---
title: "Configuration"
weight: 70
description: "Where TermHQ keeps its settings, every setting you can change, and how config files behave across versions."
---

Everything configurable lives in **Settings**. <kbd>Ctrl</kbd>+<kbd>P</kbd>
(<kbd>⌘</kbd>+<kbd>P</kbd> on macOS) opens it with the search box already focused,
so you type the setting you want instead of hunting through categories. The same
chord — or <kbd>Esc</kbd> — closes it.

Search accepts several words in any order, such as **Interface scale** or
**scale interface**. You can combine a category with a setting name, and options
inside collapsed advanced sections remain searchable. If nothing matches,
**Clear search** takes you back to the settings list.

The categories run General, Workspaces, Appearance, Terminal, Browser, SSH,
Editor, Agents, Git, Voice, Files and Shortcuts — the order this page follows.
Each one groups its settings into cards, and on/off settings are switches.

Settings are written to a JSON file you can also edit by hand.

## Where it lives

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\dev.termhq.app\config.json` |
| macOS | `~/Library/Application Support/dev.termhq.app/config.json` |
| Linux | `~/.config/dev.termhq.app/config.json` |

Alongside it, in the same directory:

| Item | Contents |
|---|---|
| `themes/` | Your own and imported color themes, plus the commented `_template.jsonc` |
| `icons/` | Installed file-icon themes |
| `backgrounds/` | The pictures and videos you added as backgrounds — copies, so they keep working when the originals move |
| `logos/` | Cached artwork for installed marketplace extensions, so the Installed list has pictures offline |
| `models/` | Downloaded and imported speech models for dictation |
| `sessions/` | One JSON per window slot: the saved state of each workspace |
| `recovery/` | Unsaved editor text, mirrored so a crash cannot take it |
| `avatars/` | Committer pictures for Source Control's History, cached after the first fetch |
| `ssh-profiles.json` | Saved SSH profiles and recent targets — hosts, users, ports and key file *paths*, never a password, passphrase or key |
| `config.json.broken-…` | A settings file TermHQ could not read, kept aside under the UTC time it was found (see below) |
| `pty-host.log` | A log file, useful to attach to a bug report |

## Missing keys are filled in

Any key absent from `config.json` takes its default. A config written by an older
TermHQ keeps working after an update — new settings appear with their defaults
rather than the file needing a migration, and hand-editing cannot break startup
by leaving something out.

The same applies in reverse: a key TermHQ no longer recognizes is ignored, and
dropped the next time the file is written.

## An unreadable file is kept

A file that is not valid JSON — or holds a value of the wrong type — does not
stop TermHQ from opening. It starts with default settings, keeps your file as
`config.json.broken-` followed by the UTC time, such as
`config.json.broken-2026-09-23T101500Z`, and shows **Your settings file couldn't
be read** with the error, where the copy went, **Open folder** and **Dismiss**.
Nothing you had is lost: with TermHQ closed, fix what the error points to and
put the file back as `config.json`.

If the file stops parsing while TermHQ is running, the next saved change keeps a
copy the same way before it writes a fresh file.

## Editing by hand

A change you make in Settings saves only the keys that changed. TermHQ re-reads
`config.json`, replaces those keys and writes the file atomically, so a hand
edit to any other key survives.

A change also reaches every open window immediately — change the theme, a
favorite or a shortcut in one workspace and the others follow. Three things
stay with each window: whether the sidebar is showing, its extra width, and the
Grid or Columns layout. They still save, as the starting point for the next new
window, but they never rearrange a window you are working in.

Open windows do not re-read the file, though. A hand edit takes effect the next
time TermHQ starts, and a key you edit by hand while it runs is overwritten if
you then change the same setting in the app. Closing TermHQ first is still the
simple way to edit it.

If a save fails, the change stays active in the window and TermHQ says
**Settings weren't saved**, with **Retry** — at the top of Settings, and in the
status bar once Settings is closed.

Keys are camelCase.

## What you can change

### General

- **Default shell** — used by the **+** button, <kbd>Ctrl</kbd>+<kbd>J</kbd> and
  favorites. Unset means the first shell detected.
- **Undo closing a terminal** — which close paths park a terminal instead of
  ending it: **Shortcut and the pane's × button** (the default), **Keyboard
  shortcut only**, or **Off — close immediately**. A parked terminal keeps
  running out of sight, so **Undo close** in the status bar brings back the
  program and its scrollback exactly as they were.
- **Undo window** — shown while undo is on: how many seconds, 3 to 60, a
  parked terminal waits before its shell is actually killed. Default 5.
- **When a shell exits on its own** — keeps failed shells' panes open by
  default so you can read and copy their output. Press Enter to close the ended
  pane. You can choose to always keep ended panes or always close them instead.
- **Clone keeps directory** — whether duplicating a pane opens in the source
  pane's directory or at home. Default on.
- **Sidebar (files & git)** — whether the Files and Source Control sidebar is
  showing. This switch, the sidebar button beside Settings in the title bar and
  <kbd>Ctrl</kbd>+<kbd>B</kbd> (<kbd>⌘</kbd>+<kbd>B</kbd> on macOS) are the same
  switch, and wherever you leave it is where the next launch starts. It also
  follows the grid on its own: the file tree reads the focused terminal's
  directory, so it leaves when your last terminal does and comes back with the
  next one. Switching it off yourself outranks that — it then stays shut,
  including while you move between terminals, until you switch it back on.
- **Sidebar side** — left or right. The sidebar button in the title bar mirrors
  itself to show which side the sidebar occupies.
- **Sidebar extra width** — gives the Files and Source Control sidebar more
  room, up to 338 extra pixels before interface scaling. Drag its inner edge to
  resize it, or use this slider. The original width is the minimum, the maximum
  adapts to narrow windows, and your choice is remembered. Double-click the edge
  to reset; with the edge focused, use the left/right arrows to resize,
  <kbd>Home</kbd> to reset or <kbd>End</kbd> for the maximum. Its highlight appears
  after a brief hover, so passing over the edge does not light it up.
- **Favorite directories** — your starred directories, in order. Drag a row by
  its grip, focus the grip and use the arrow keys (<kbd>Home</kbd> and
  <kbd>End</kbd> jump to either end), or use the up and down buttons.
  **Add folder…** adds one through the system's folder dialog and says so if it
  already is a favorite. Removing one asks first: the **×** turns into a red
  **Remove?**, and only that click removes it. One order drives the title bar
  dropdown, the welcome list *and* the number keys — only the first ten get a
  number — so there is never a second ordering to keep in sync. Favorites are
  stored shell-agnostically: opening one spawns whatever your default shell is
  at the time you click, not the one that starred it.
- **Check for updates automatically** — under **Updates**, on by default.
  Checks shortly after launch and every six hours while the app runs. **Check
  now** checks on demand, including when automatic checks are off. An available
  release offers **Update and restart**; installation requires your click and
  stops running commands and agents. The same card shows the **Version** you are
  running, the one to quote in a bug report. See
  [Updating](/docs/installation/#updating).

Grid or Columns is not a row here. It is the switch in the title bar, or the
**Switch between Grid and Columns** action — unassigned by default, so bind it
under **Shortcuts** or run it from the command palette. Each workspace keeps its
own mode; the `layout` key in `config.json` is only the mode a new window starts
in, and it is not synced to windows already open.

### Workspaces

- **On startup** — resume the most recent workspace, show the picker, or start a
  new one. Default: most recent. A taskbar jump-list click overrides it for that
  launch.
- **Open a terminal in new workspaces** — whether a workspace with nothing to
  restore starts with one default terminal or on the start panel. Default on.
  Turning it off is also what makes a workspace you opened, looked at and closed
  clean up after itself, since a workspace closed with no terminals in it is
  deleted rather than kept.
- **Restore session on startup** — reopen your last panes with their shells,
  directories, layout, zoom and titles. Default on. Off means every launch starts
  fresh — with one default terminal, or empty if you turned the setting above
  off — and anything still alive from last time is ended.
- **Keep shells running after close** — closing the window leaves its shells
  running in the background, and the next launch picks them up. Default on. Needs
  session restore to do anything.
- **Stashed panes stay stashed** — see
  [Persistent sessions](/docs/persistent-sessions/). Default **off**.

### Appearance

- **Interface density** — **Compact** keeps the default spacing;
  **Comfortable** gives buttons and rows larger click targets. Neither changes
  terminal or editor text size.
- **Interface scale** — 100% (default), 110%, 125% or 150% for app labels and
  controls. Terminal fonts, editor fonts and browser-page zoom keep their own
  settings. Density and scale work with every theme.
- **Dim unfocused panes** — default off. Washes every pane but the focused one
  toward the theme's background, so the one you are typing into stands out even
  in a theme whose focus edge is subtle. The dimmed panes still take clicks.
- **Theme** and **Terminal theme** — the second can point at a different theme,
  so the terminal palette and the interface need not match; **Match app theme**
  keeps them together. Both are searchable; see [Theming](/docs/theming/) for
  previews and theme-pack variants. **Manage themes → Marketplace & installed…**
  opens the Marketplace, a page inside Settings for theme packs from Open VSX;
  Back or <kbd>Esc</kbd> returns to Appearance.
- **Background** — a picture, a GIF or a looping video behind your terminals.
  The card shows your backgrounds as tiles: **None**, each one you have added,
  and **Add…**, which copies a file into your `backgrounds/` folder and applies
  it. Pictures can be PNG, JPEG, WebP, GIF, AVIF or BMP, and videos MP4, WebM or
  M4V, up to 1 GB. Videos play muted and looping, and pause while the window is
  hidden. A tile's **×** deletes that file from the folder, after the same
  **Remove?**. Files you drop into the folder by hand are listed too. One
  background serves every workspace, like the theme. Once one is chosen, these
  appear:
  - **Transparency** — how much of the background shows through the terminals,
    0–100%, default 25%. Text stays solid at any value.
  - **Blur** — 0–20 px, default off.
  - **Fit** — **Fill** (the default) covers the grid and crops what does not
    fit; **Fit** shows all of it, on the terminal's background color.
  - **Speed** — for a video or a GIF: from a quarter pace to double, default
    normal. On Windows a GIF follows it too; on macOS a GIF plays at its own
    pace and gets no Speed row.

  See [Backgrounds](/docs/theming/#backgrounds) for how one meets a theme.
- **Pane style** — how terminals sit in the grid: **Spaced** (small gaps and
  rounded corners, the default) or **Boxy** (no gaps, square corners — the
  tiling-window-manager look). Borders stay in both, so two terminals never
  read as one.
- **Resize panes by dragging** — default on. Off gives every pane an equal share
  and takes the handles away, which is the grid exactly as it was before the
  feature existed. Your proportions are remembered either way, so turning it
  back on returns the layout you had rather than a blank one. Opening or closing
  a pane resets them regardless of this setting — that rule belongs to
  [resizing](/docs/panes-and-layout/#resizing-panes), not to the toggle.
- **Animate panes** — default on. Panes glide into place when they swap, move
  or resize; a maximized pane grows from its cell to fill the grid and shrinks
  back when restored; a new pane settles into its cell and a closed one fades
  from its place; a stashed pane flies into the shelf's count and back out. The
  sidebar slides in and out, and a workspace fades in once it has opened. Off,
  everything jumps straight to where it goes. Reduced motion in your system
  settings turns it off too.
- **Git diff view** — side by side or stacked; the same setting as **Diff
  layout** under **Git**.
- **Default font size** — 11 to 18 px, the base text size for every terminal.
  Zooming a single pane is an offset on top of it, so changing it here moves
  them all and keeps each pane's own zoom. The font itself, the cursor style and
  cursor blink are under **Terminal**.
- **File icons** — the icon set the file tree draws with: built-in (colored by
  type) or an installed pack. It previews as you browse the list. **Manage icon
  packs → Marketplace & installed…** opens the Marketplace's icon packs.
- **Folders** — **Themes folder**, **Icons folder** and **Backgrounds folder**
  open those directories. Drop a theme, an icon pack or a background in by hand
  and reopen Settings to see it.

The [status bar](/docs/panes-and-layout/#the-status-bar) is always visible. Its
space stays reserved, so waiting notices and recovery controls do not resize
the pane grid. Waiting-pane visibility is configured under **Agents**, below.

### Terminal

- **Font** — the list is the monospaced fonts actually installed on the
  machine; **Custom…** takes any other family by name. A chosen family sits in
  front of the shipped stack, so a missing glyph still renders monospaced.
- **Cursor style** — block, bar or underline — and **Cursor blink**, on by
  default.
- **Modern Unicode widths** — Unicode 11 width tables, so emoji and CJK measure
  two cells and the box art agent CLIs print stays aligned. Default on; turn it
  off only for an older program that assumes the legacy character widths.
- **Confirm multi-line pastes** — **Only when the lines would run** (the
  default) asks before pasting several lines only when the receiving program
  would run them on arrival. Programs that take a paste as one block you still
  submit yourself — every modern shell and agent CLI — do not trigger it.
  **Every multi-line paste** always asks; **Never** never does. A single line
  never asks. This applies to keyboard and right-click paste alike.
- **Right-click in a terminal** — **Automatic** (the default) opens a menu on
  macOS and copies or pastes elsewhere. **Open a menu** always shows Copy,
  Paste, Select all, Clear and Find. **Copy the selection, else paste** is the
  Windows console habit: with text selected a right-click copies it, with
  nothing selected it pastes.
- **Zoom controls (Ctrl+scroll)** — whether <kbd>Ctrl</kbd>+scroll
  (<kbd>⌘</kbd>+scroll on macOS) over a pane resizes its text. Default on. The
  keyboard zoom keys work either way.
- **Follow terminal titles** — pane headers show the title the running program
  reports (OSC 0/2) rather than the shell name. Default on. A title you set by
  hand always wins.
- **GPU terminal rendering** — draws the terminal on the graphics card, so box
  art and block characters land exactly in their cells.
  Default on; the escape hatch if the renderer runs out of memory on a very long
  agent session. Applies to newly opened panes.
- **Scrollback lines** — lines retained per terminal, 1,000 to 20,000, default
  8,000. Memory scales with this times the number of open panes.

### Browser

Settings for [browser panes](/docs/browser-panes/).

- **Search engine** — where a browser pane's URL bar sends anything that is not
  a web address: DuckDuckGo (the default), Google, Bing or Brave. Web addresses
  and localhost ports are never searched; they open directly.
- **New panes open** — what <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> lands
  on. Takes anything the URL bar takes, so `localhost:3000` puts every new pane
  on your dev server. Empty means a blank pane with the URL bar focused. A pane
  opened by a page — a link that wanted a new tab — keeps its own address, and
  so does a clone.
- **Browser button on the titlebar** — default on: the globe in the title bar,
  right of the favorites star, that opens a browser pane in one click. Off takes
  the button away and puts a **Browser** row in the **+** button's shell list
  in its place; the chord and the command palette open one either way.
- **Warn before the tenth browser pane** — default on. Each browser pane is a
  native webview with its own renderer process, so ten live pages are a real
  memory and CPU load; opening a tenth onto the grid asks first, with *Open
  anyway* and *Don't warn again*. Stashed panes are not counted. Off skips the
  ask.
- **Sound in new panes** — default on. Off means new browser panes start muted;
  the speaker in each pane's header unmutes that one page and stays visible
  while it is muted, so silence is never a mystery. Muting works on Windows, and
  on macOS where the system's WebKit supports page audio control; where it does
  not, pressing the speaker says so instead.

### SSH

Settings for [SSH connections](/docs/ssh/).

- **SSH connections** — default off. On adds **Connect via SSH…** to the bottom
  of the **+** button's shell list and lets the command palette's **Connect via
  SSH** run; off, the palette still lists it but refuses, saying where to turn
  it on. SSH panes that already exist keep working either way — reconnecting,
  cloning and session restore do not ask. While it is off, this switch is all
  the category shows.
- **OpenSSH client** — which installed client opens SSH panes. **Automatic**
  (the default) takes the first one found: on Windows the built-in Windows
  OpenSSH, then Git for Windows's, then `ssh` on your `PATH`; on macOS the
  system `ssh` first. Every client found is listed with its version, and **A
  path…** takes any other `ssh` executable. The chosen client's agent, keys and
  config are the ones in play — on Windows the two clients do not share them —
  and the line under the row names the client in use and the `ssh_config` file
  it reads.
- **Keep idle connections alive** — how often a keep-alive crosses each idle
  connection: 0 to 120 seconds in steps of 15, default every 30. It keeps a NAT
  or a firewall from dropping a quiet connection without a word, and notices a
  dead one within a few probes instead of on your next keystroke. It reaches the
  client as `ServerAliveInterval`, ahead of your own ssh config — the one option
  TermHQ adds on its own. At 0 (**off**) it adds nothing and leaves your config
  in charge.

Passwords, passphrases and host-key questions are the client's own, answered in
the pane; TermHQ stores none of them. Saved profiles live in `ssh-profiles.json`
beside `config.json`, with no secrets in them.

### Editor

Settings for [editor panes](/docs/editor/) and
[language servers](/docs/language-servers/).

- **Word wrap** — soft-wrap long lines instead of scrolling sideways. Default
  off.
- **Minimap** — Monaco's overview column. Default off: grid panes are narrow,
  and the minimap spends width the code wants.
- **Font size follows the terminal** — default on, so one knob rules both. Turn
  it off and an **Editor font size** slider, 8 to 32 px, appears beside it.
  Per-pane zoom stacks on top of whichever is in effect.
- **Format on save** — ask your language server to format the document every
  time you save. Default off, because a save that silently reformats a whole
  file is a diff nobody asked for. Formatting by hand works regardless.
- **Recover unsaved changes after a crash** — default on. Mirrors unsaved text
  so a crash, force-quit or power cut does not take it. Turning it off deletes
  everything it had mirrored.
- **Files panel shows the repo while editing** — default on: with an editor
  focused, the Files panel roots at the file's repository and reveals the file
  in the tree. Off gives you the file's own folder instead. Terminals are
  unaffected either way.
- **Editing shortcuts stay in the editor** — default on: app chords that Monaco
  also binds fall through to the editor while one is focused. See
  [Keyboard shortcuts](/docs/keyboard-shortcuts/#when-an-editor-pane-has-focus).
  Expand **Editor shortcut reference** for a read-only list of the keys an
  editor pane answers to, grouped under **Find**, **Multi-cursor**, **Lines**,
  **Navigate**, **Tabs**, **Format**, **Markdown**, and **Undo, save & close**.
- **Language intelligence** — the master switch for
  [language servers](/docs/language-servers/). Expand **Language server setup** to
  add or enable a server, edit its command and arguments, watch live status,
  restart it, or read its log. Default on — but TermHQ ships no servers, so
  nothing runs until you install one. **Arguments**, **Languages** and **Root
  markers** keep spaces and commas while you type; press <kbd>Enter</kbd> or
  move to another field to apply the entry. See
  [Adding your own server](/docs/language-servers/#adding-your-own) for the field
  formats.

### Agents

The launchers lead the category, in a card that is always open:

- **Agent launchers** — the list behind every pane header's ✳ button and every
  “Open in &lt;shell&gt;” agent flyout. Each row shows the digit it answers to
  after <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, the mark the menu shows for
  it, its name, whether its command was *found* or is *not on PATH*, and the
  command itself, typed into the pane's shell as written — flags welcome
  (`claude --dangerously-skip-permissions`). Ships with Claude Code, Codex,
  OpenCode, Antigravity and Grok Build, and an install that predates one of
  those picks it up once. **Add agent** adds a row with the cursor in its name.
  Reorder by the grip — drag it, or focus it and use the arrow keys,
  <kbd>Home</kbd> and <kbd>End</kbd> — or with the up and down buttons, and
  removing one asks **Remove?** first. **The order is both the menu's order and
  the digits**; an entry whose program is not on `PATH` is left out of the menu,
  and the next one takes its number.
- **IDE command** — in the **Open in IDE** card: what the `</>` button runs
  against a directory. Default `code`; flags allowed. On macOS, command
  detection uses your login-shell path even when TermHQ opens from Finder or the
  Dock; see [Running coding agents](/docs/agents/#command-detection-on-macos).

The **Idle agents** card holds the rest:

- **Agent idle badge** — badge a pane that was busy while you were looking
  elsewhere and has since gone quiet. Default on.
- **Quiet seconds before badge** — how long a busy pane must stay silent before
  it is marked for attention: 5 to 60 seconds, default 10; applies to both
  badges and waiting notices. Shown while **Agent idle badge** is on. Raise it
  for agents that pause to think; silence is not confirmation that a job
  succeeded.
- **Show waiting panes in the status bar** — default on. While the window is
  focused, an agent or command that goes quiet while you are looking elsewhere
  appears in the waiting list. While the window is in the background, it sends
  a native OS notification as well, and the entry is still there when you come
  back. Off disables both, without changing **Agent idle badge**.
- **Always show it, even when nothing is waiting** — default off. Appears while
  waiting notifications are enabled. On keeps a muted **0 waiting** item in the
  bar when the list is empty; off hides it until a pane needs your attention.
- **Notification color** — the color every attention surface draws from.
  Defaults to the active theme's accent; a preset (amber, white, red, green,
  blue) or **Custom…** pins it across all themes.

The waiting list shows panes newest first, each with the time it has been
*waiting since* — when it went quiet — and whether it is in the grid or in the
stash shelf. Select one to return to the pane, or dismiss a notice with its
**×** (or all of them with **Dismiss all**) without interrupting its work.
Notices have no auto-dismiss timer. Fresh terminals do not raise waiting notices
just for startup output. See
[When a pane needs your attention](/docs/agents/#when-a-pane-needs-your-attention)
for the full behavior.

### Git

The [Source Control](/docs/source-control/) panel can review and stage changes,
commit, browse history, manage branches, sync, resolve conflicts, use stashes,
and create worktrees. These settings tune its defaults:

- **Worktree roots** — folders containing repositories or worktrees that you
  want in the global [Worktrees](/docs/worktrees/) view. Type a path or use
  **Choose folder…**. With no roots set, nothing is scanned and the status-bar
  item stays hidden. Removing a root only stops tracking it; nothing on disk
  changes.

- **Branch order** — how the branch picker sorts: most recently committed
  first, or alphabetical.
- **Pull style** — what pull does when your branch and its upstream have both
  moved: fast-forward only (the default — it stops and says so rather than
  surprising you), rebase, or merge.
- **Auto-fetch** — a quiet background fetch so ahead/behind counts stay
  honest: off by default, or every 5 to 60 minutes in 5-minute steps. Failures
  are silent on purpose; a fetch that fails on a plane should not raise a
  banner.
- **Prune on fetch** — drop remote-tracking branches whose upstream is gone.
  Default on.
- **Refresh every** — how often the panel re-reads status, 1 to 30 seconds,
  default 3; a very large repository may prefer a longer interval.
- **Conflict count on the Source Control tab** — a badge on the tab itself, so a merge an
  agent started in a background pane is visible while you are looking at
  Files.
- **Diff layout** — unified (stacked) or side by side; the same toggle lives
  in the diff window's header, and under **Appearance** as **Git diff view**.
- **Committer pictures in History** — default on. A picture beside each commit
  in History: a GitHub noreply address names its account, anything else asks
  Gravatar by email digest, cached after the first fetch. Off shows initials
  and sends nothing.

### Voice

- **Voice dictation** — show the mic button and honor the dictation chord.
  Default on — but the button only exists once a speech model is installed,
  so a fresh install shows no voice controls at all until you download one.
- **Microphone** — which input to record from; **System default** unless you
  pick one, and the system default takes over if the chosen one is unplugged.
- **Dictation language** — English by default, fifteen more (Arabic, Chinese,
  Dutch, French, German, Hindi, Italian, Japanese, Korean, Polish, Portuguese,
  Russian, Spanish, Turkish and Ukrainian), or **Auto-detect**, which lets a
  multilingual model identify the language per recording. English-only models
  transcribe English regardless, and the panel warns about that combination
  when you pick it.
- **Test microphone** — record a few seconds and play them back through the
  exact capture path dictation uses, with a verdict on the level — so "is my
  mic working?" gets answered before any words are spent on it.
- **Speech model** — the model manager: download with live progress and
  cancel, switch between downloaded models, delete them, or import your own
  file. Every row shows its size and language coverage, every downloaded
  model records where it came from and when, and the panel links its sources
  so you can verify them yourself.
- **Hold to talk** — default off. Hold the key below in a terminal for a moment
  to start dictating; let go to transcribe. A tap still types what the key
  normally types. Off by default because on Space it takes the hold away from
  the programs in the terminal, Claude Code's own hold-to-dictate included.
- **Hold key** — Space by default. Click it and press any single key, a
  modifier such as Right Ctrl included; <kbd>Esc</kbd> keeps the current one.
  On a key of its own, Claude Code's hold-to-dictate keeps working alongside.
  See [Dictation](/docs/dictation/).

### Files

- **Show hidden files (dotfiles, OS-hidden)** — default **on**; `ls -a` is the
  terminal user's default worldview, so hiding is the opt-in.
- **Open with…** — the right-click "open with" list. Each entry is a name plus
  a command, run either as an **app**, detached (Notepad on Windows, TextEdit on
  macOS), or in a new **terminal** pane opened in the file's directory (vim,
  nano). **Add opener**
  adds one; reorder and remove them the way you do favorites.

  A folder's menu starts with **New file…** and **New folder…**, which create
  inside that folder, and every file and folder menu ends with **Rename…** and
  **Delete…** (<kbd>F2</kbd> and <kbd>Delete</kbd> on a focused row do the
  same). Rename edits the name in place with the name preselected and the
  extension kept; Delete asks first and moves the item to the Recycle Bin or
  Trash, never deleting outright. The panel's root and the folders above it
  offer neither. Two more entries appear on their own rather than from
  this list: **Open in IDE**,
  and **Open in Obsidian** for a folder that is actually a vault on a machine
  that actually has Obsidian. A folder counts as a vault once it contains the
  `.obsidian` directory Obsidian writes the first time it opens one. It opens
  through Obsidian's own URL scheme rather than its executable, so a vault
  already open is brought to the front instead of opened twice.
- **Terminal openers run in** — which shell those terminal openers get. Until you
  pick one they stay hidden entirely, because vim in PowerShell helps nobody.

Whether the sidebar shows, and its side and width, are under **General**. The
sidebar header identifies the pane or folder it is following, and its right
edge holds a small toolbar. On both tabs, **Pin** stops the sidebar following
the focused pane — Files stays on its folder, Source Control on that folder's
repository, and the header reads **Pinned** until you unpin. On the Files tab it
adds **New file** and **New folder** (a name row appears in the tree; Enter
creates, Escape cancels, and a new file opens straight into the editor),
**Find files by name** (the same search <kbd>Ctrl</kbd>+<kbd>F</kbd> runs after
you click in the panel), **Collapse all**, **Refresh** (the icon turns once and
the button stays disabled until the re-read has finished), and, when the folder
is an Obsidian vault on a machine that has Obsidian, a button carrying
Obsidian's mark that opens the vault. With no terminal to follow, the panel says
**No folder open** and offers **Open folder…**. The path bar above the tree stays
on one line: a deep path folds its middle folders into a `…` button whose menu
lists them, and each still opens on click or offers a terminal on right-click.

### Shortcuts

Every action, rebindable, grouped under six headings: **Open panes**, **Source
Control**, **Terminals**, **Focus & layout**, **Arrange without the mode** and
**App**. Only your overrides are stored — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/). Once any differ from the
defaults, **Reset all shortcuts** puts them all back, after asking.

- **Show shortcuts on screen** — default off. Shows each chord you press along
  with what the app did with it, for demos, screen recordings, and working out
  why a chord seems to do nothing.
