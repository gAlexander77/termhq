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
inside collapsed advanced sections remain searchable. If nothing matches, use
the empty-search state's clear action to return to the settings list.

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
| `logos/` | Cached artwork for installed marketplace extensions, so the Installed list has pictures offline |
| `sessions/` | One JSON per window slot: the saved state of each workspace |
| `pty-host.log` | A log file, useful to attach to a bug report |

## Missing keys are filled in

Any key absent from `config.json` takes its default. A config written by an older
TermHQ keeps working after an update — new settings appear with their defaults
rather than the file needing a migration, and hand-editing cannot break startup
by leaving something out.

The same applies in reverse: a key TermHQ no longer recognizes is ignored, and
dropped the next time the file is written. And if the file cannot be parsed at
all, TermHQ starts with defaults rather than refusing to open.

## Editing by hand

Close TermHQ before editing `config.json`, or your changes will be overwritten
the next time it saves — TermHQ writes the whole file whenever a setting changes.

Keys are camelCase.

## What you can change

### General

- **Check for updates automatically** — under **Updates**, on by default.
  Checks shortly after launch and every six hours while the app runs. **Check
  now** checks on demand, including when automatic checks are off. An available
  release offers **Update and restart**; installation requires your click and
  stops running commands and agents. See [Updating](/docs/installation/#updating).
- **Default shell** — used by the **+** button, <kbd>Ctrl</kbd>+<kbd>J</kbd> and
  favorites. Unset means the first shell detected.
- **Undo close** — which close paths get an undo window: none, the keyboard
  shortcut only, or the shortcut and the pane's **×** button. Default: both.
- **Undo window length** — seconds before the parked shell is actually killed.
  Default 5.
- **When a shell exits on its own** — keeps failed shells' panes open by
  default so you can read and copy their output. Press Enter to close the ended
  pane. You can choose to always keep ended panes or always close them instead.
- **Clone keeps directory** — whether duplicating a pane opens in the source
  pane's directory or at home. Default on.
- **Layout preset** — Grid or Columns. Also the title bar switch.
- **Sidebar side** — left or right. The sidebar button beside Settings in the
  title bar toggles it and mirrors itself to show which side it occupies;
  <kbd>Ctrl</kbd>+<kbd>B</kbd> does the same thing.
- **Sidebar extra width** — gives the Files and Source Control sidebar more
  room, up to 338 extra pixels before interface scaling. Drag its inner edge to
  resize it, or use this slider. The original width is the minimum, the maximum
  adapts to narrow windows, and your choice is remembered. Double-click the edge
  to reset; with the edge focused, use the left/right arrows to resize,
  <kbd>Home</kbd> to reset or <kbd>End</kbd> for the maximum. Its highlight appears
  after a brief hover, so passing over the edge does not light it up.
- **Favorites** — starred directories, reorderable with ↑/↓. One order drives
  the title bar dropdown, the welcome list *and* the number keys, so there is
  never a second ordering to keep in sync. They are stored shell-agnostically:
  opening one spawns whatever your default shell is at the time you click, not
  the one that starred it.

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
- **Theme** and **Terminal theme** — the second can point at a different theme,
  so the terminal palette and the interface need not match. Both are searchable;
  see [Theming](/docs/theming/) for previews and theme-pack variants.
- **Default font size** and **font family** — the font list is the monospaced
  fonts actually installed on the machine; anything else can be typed by name. A
  chosen family sits in front of the shipped stack, so a missing glyph still
  renders monospaced.
- **Cursor style** — block, bar or underline — and **cursor blink**.
- **File icons**, plus marketplace browsers for themes and icon packs, and
  buttons that open the `themes/` and `icons/` folders.
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
The [status bar](/docs/panes-and-layout/#the-status-bar) is always visible. Its
space stays reserved, so waiting notices and recovery controls do not resize
the pane grid. Waiting-pane visibility is configured under **Agents**, below.

### Terminal

- **Confirm multi-line pastes** — default on. Asks before pasting several lines
  when the receiving program might execute them immediately. Programs that
  safely accept the paste as one block do not trigger the prompt. This applies
  to keyboard and right-click paste.
- **Scrollback** — lines retained per terminal, default 8000. Memory scales with
  this times the number of open panes.
- **Ctrl+scroll zoom** — whether the wheel zooms the hovered pane. Default on.
- **Follow terminal titles** — pane headers show the title the running program
  reports (OSC 0/2) rather than the shell name. Default on. A title you set by
  hand always wins.
- **Modern Unicode widths** — Unicode 11 width tables, so emoji and CJK measure
  two cells and the box art agent CLIs print stays aligned. Default on; turn it
  off only for an older program that assumes the legacy character widths.
- **GPU terminal rendering** — draws the terminal on the graphics card, so box
  art and block characters land exactly in their cells.
  Default on; the escape hatch if the renderer runs out of memory on a very long
  agent session. Applies to newly opened panes.

### Browser

Settings for [browser panes](/docs/browser-panes/).

- **Globe button** — default on: the globe in the title bar, right of the
  favorites star, that opens a browser pane in one click. Off removes the
  button and nothing else — the chord, the command palette and the spawn menu's
  Browser entry all still work.
- **Search engine** — where a browser pane's URL bar sends anything that is not
  a web address: DuckDuckGo (the default), Google, Bing or Brave. Web addresses
  and localhost ports are never searched; they open directly.
- **New panes open** — what <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> lands
  on. Takes anything the URL bar takes, so `localhost:3000` puts every new pane
  on your dev server. Empty means a blank pane with the URL bar focused. A pane
  opened by a page — a link that wanted a new tab — keeps its own address, and
  so does a clone.
- **Sound in new panes** — default on. Off means new browser panes start muted;
  the speaker in each pane's header unmutes that one page and stays visible
  while it is muted, so silence is never a mystery. **Muting is Windows-only
  for now** — elsewhere the button toggles but silences nothing, and this
  setting cannot start a pane muted.

### Editor

Settings for [editor panes](/docs/editor/) and
[language servers](/docs/language-servers/).

- **Word wrap** — soft-wrap long lines instead of scrolling sideways. Default
  off.
- **Minimap** — Monaco's overview column. Default off: grid panes are narrow,
  and the minimap spends width the code wants.
- **Font size follows the terminal** — default on, so one knob rules both. Turn
  it off and an **Editor font size** slider appears beside it. Per-pane zoom
  stacks on top of whichever is in effect.
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
  editor pane answers to, grouped by what they do — find, multi-cursor,
  navigation, tabs, formatting, markdown, and save/close.
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

Agent and IDE commands live inside the expandable **Launcher commands** section.
They remain discoverable through Settings search while it is collapsed.

- **Agent commands** — the list behind every pane header's ✳ button and every
  “Open in &lt;shell&gt;” agent flyout. Name plus command, flags welcome (`claude
  --dangerously-skip-permissions`). Ships with Claude Code, Codex, OpenCode and
  Antigravity. **The array order is both the
  dropdown order and the digit each answers to** after
  <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, and entries whose program is not
  on `PATH` are hidden automatically.
- **IDE command** — what the `</>` button runs against a directory. Default
  `code`; flags allowed. On macOS, command detection uses your login-shell path
  even when TermHQ opens from Finder or the Dock; see
  [Running coding agents](/docs/agents/#command-detection-on-macos).
- **Notification color** — the color every attention surface draws from.
  Defaults to the active theme's accent; setting it here pins it across all
  themes.
- **Agent idle badge** — badge a pane that was busy while you were looking
  elsewhere and has since gone quiet. Default on.
- **Quiet seconds before badge** — how long a busy pane must stay silent before
  it is marked for attention. Default 10 seconds; applies to both badges and
  waiting notices. Shown while **Agent idle badge** is on. Raise it for agents
  that pause to think; silence is not confirmation that a job succeeded.
- **Show waiting panes in the status bar** — default on. While the window is
  focused, an agent or command that goes quiet while you are looking elsewhere
  appears in the waiting list. While the window is in the background, it sends
  a native OS notification as well, and the entry is still there when you come
  back. Off disables both, without changing **Agent idle badge**.
- **Always show it, even when nothing is waiting** — default off. Appears while
  waiting notifications are enabled. On keeps a muted **Waiting** item in the
  bar when the list is empty; off hides it until a pane needs your attention.

The waiting list shows panes newest first, with the time each notice appeared
and its pane's current location. Select one to return to the pane, or dismiss
the notice without interrupting its work. Notices have no auto-dismiss timer.
Fresh terminals do not raise waiting notices just for startup output. See
[When a pane needs your attention](/docs/agents/#when-a-pane-needs-your-attention)
for the full behavior.

### Files

- **Show hidden files** — dotfiles and OS-hidden entries. Default **on**; `ls -a`
  is the terminal user's default worldview, so hiding is the opt-in.
- **Sidebar** — showing or not. It also follows the grid on its own: the file
  tree reads the focused terminal's directory, so it leaves when your last
  terminal does and comes back with the next one. Shutting it yourself outranks
  that — it then stays shut, including while you move between terminals, until
  you open it yourself again. Opening it with no terminals open leaves it open
  and empty, which is the honest answer rather than a toggle that appears to do
  nothing. The sidebar header identifies the pane or folder it is following;
  its side and extra width are configured under **General**.

  The header's right edge holds a small toolbar. On both tabs, **Pin** stops
  the sidebar following the focused pane — Files stays on its folder, Source
  Control on that folder's repository, and the header reads **Pinned** until
  you unpin. On the Files tab it adds **New file** and **New folder** (a name
  row appears in the tree; Enter creates, Escape cancels, and a new file opens
  straight into the editor), **Collapse all**, **Refresh** (the icon turns once
  and the button stays disabled until the re-read has finished), and, when
  the folder is an Obsidian vault on a machine that has Obsidian, a button
  carrying Obsidian's mark that opens the vault. The path bar above the tree
  stays on one line: a deep path folds its middle folders into a `…` button
  whose menu lists them, and each still opens on click or offers a terminal
  on right-click.
- **File openers** — the right-click "open with" list. Each is a name plus a
  command, run either detached (Notepad) or in a new terminal pane opened in the
  file's directory (vim, nano).

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

### Git

The [Source Control](/docs/source-control/) panel can review and stage changes,
commit, browse history, manage branches, sync, resolve conflicts, use stashes,
and create worktrees. These settings tune its defaults:

- **Worktree roots** — folders containing repositories or worktrees that you
  want in the global [Worktrees](/docs/worktrees/) view. Type a path or choose a
  folder. With no roots set, nothing is scanned and the status-bar item stays
  hidden. Removing a root only stops tracking it; nothing on disk changes.

- **Branch order** — how the branch picker sorts: most recently committed
  first, or alphabetical.
- **Pull style** — what pull does when your branch and its upstream have both
  moved: fast-forward only (the default — it stops and says so rather than
  surprising you), rebase, or merge.
- **Auto-fetch** — a quiet background fetch every few minutes so ahead/behind
  counts stay honest. Failures are silent on purpose; a fetch that fails on a
  plane should not raise a banner.
- **Prune on fetch** — drop remote-tracking branches whose upstream is gone.
- **Refresh every** — how often the panel re-reads status; a very large
  repository may prefer a longer interval.
- **Conflict count on the Source Control tab** — a badge on the tab itself, so a merge an
  agent started in a background pane is visible while you are looking at
  Files.
- **Diff layout** — unified (stacked) or side by side; the same toggle lives
  in the diff window's header.

### Voice

- **Voice dictation** — show the mic button and honor the dictation chord.
  Default on — but the button only exists once a speech model is installed,
  so a fresh install shows no voice controls at all until you download one.
- **Input device** — which microphone to use; falls back to the system default if
  the chosen one is unplugged.
- **Dictation language** — English by default, sixteen more, or auto-detect,
  which lets a multilingual model identify the language per recording.
  English-only models transcribe English regardless, and the panel warns
  about that combination when you pick it.
- **Test microphone** — record a few seconds and play them back through the
  exact capture path dictation uses, with a verdict on the level — so "is my
  mic working?" gets answered before any words are spent on it.
- **Speech model** — the model manager: download with live progress and
  cancel, switch between downloaded models, delete them, or import your own
  file. Every row shows its size and language coverage, every downloaded
  model records where it came from and when, and the panel links its sources
  so you can verify them yourself.

### Shortcuts

Every action, rebindable, grouped under four headings. Only your overrides are
stored — see [Keyboard shortcuts](/docs/keyboard-shortcuts/).

- **Show shortcuts on screen** — default off. Shows each chord you press along
  with what the app did with it, for demos, screen recordings, and working out
  why a chord seems to do nothing.
