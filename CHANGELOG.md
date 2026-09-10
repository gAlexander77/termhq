# Changelog

All notable user-facing changes to TermHQ, newest first. This file is rendered
directly at [termhq.dev/changelog](https://termhq.dev/changelog/).

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing yet.

## 0.2.5 — 2026-09-10

### Added

- A toolbar on the Files sidebar: **New file** and **New folder** (name the
  entry right in the tree; a new file opens straight into the editor), **Collapse
  all**, **Refresh**, and — when the folder is an Obsidian vault on a machine
  that has Obsidian — an **Open in Obsidian** button carrying Obsidian's mark.
  Folder right-click menus start with **New file…** and **New folder…** too.
- **Pin** the sidebar: stop it following the focused pane, so Files stays on
  its folder and Source Control on that folder's repository while you move
  between terminals. One pin, on both tabs; the header reads **Pinned**.
- The Ctrl+Shift+A agent picker shows each agent's mark beside its digit.

### Changed

- The Files path bar stays on one line: a deep path folds its middle folders
  into a `…` button whose menu still opens each of them (or a terminal there on
  right-click), and widening the sidebar brings them back.
- The sidebar can be dragged much wider — up to 338 extra pixels, still capped
  so panes keep most of the window. Its default width is unchanged.
- The waiting indicator in the status bar now mirrors Undo close: a **N
  waiting** count that stays, and for a few seconds after a pane goes quiet, a
  chip beside it naming that pane under a draining bar — click the chip to jump
  straight there. Both controls are drawn in the theme's own ink rather than a
  solid accent block, so they sit quietly on every theme.
- Every refresh button (Files, Git History, Source Control, worktrees) turns
  once per click and stays disabled until the re-read has finished, so a click
  is always visibly acknowledged and never queues up.

### Fixed

- Release builds no longer show the browser's default right-click menu over
  the app's own interface, and no longer open a web inspector on it. Browser
  panes keep their own right-click menus and their DevTools button.
- Background-finished panes are recorded in the waiting list as well as raising
  the OS notification, so they are there when you return (the description was
  wrong; the behavior is now what the docs say).

## 0.2.4 — 2026-09-09

### Added

- A permanent "waiting" indicator in the status bar. When an agent finishes its
  turn or a script ends in a pane you aren't watching, it collects there; open
  it for a list of everything waiting on you, newest first, each showing when it
  started waiting and whether it's out in the grid or on the stash shelf. Click
  one to jump straight to that pane.
- Settings to keep the waiting indicator always visible even when nothing is
  waiting, or to turn it off entirely.

### Changed

- The status bar is now always present, holding the undo, waiting, stash and
  workspace controls.
- Settings search matches a setting's category together with its name in any
  word order, so "Terminal font" finds the terminal font setting.
- Redrew the worktrees icon.

### Fixed

- Launching an agent no longer occasionally drops the first character of the
  command (for example "laude" instead of "claude").
- Editing a language server's arguments, languages or root markers keeps the
  separators you type and no longer discards the edit when Settings is closed
  with Escape or a click outside.
- Deleting a stashed pane from the shelf no longer rearranges the panes still on
  screen.
- The reopen-last-tab shortcut works again in an editor's reading mode.
- The Files panel no longer shows a stale directory after some actions, and
  Enter in the stash shelf and worktrees list no longer activates the wrong
  control.
- Closing a waiting pane on its own no longer leaves the window unresponsive to
  Escape; "waiting since" shows when the pane actually went quiet; a pane that
  finished while the app was in the background now shows up when you return; and
  dismissing a notice also clears that pane's badge.

## 0.2.3 — 2026-09-08

### Fixed

- Fixed the incomplete macOS app bundle signature in v0.2.2 that caused a
  "TermHQ is damaged and can't be opened" error. Release builds now sign the
  complete app bundle and verify its signature before publication.
- Updated macOS installation guidance. The app is still not Apple-notarized
  and requires approval in System Settings → Privacy & Security → Open Anyway.

## 0.2.2 — 2026-09-08

### Changed

- Added a restrained theme-colored glow around focused panes, preserving downloaded palettes.
- Improved editor-tab accessibility and arrow-key navigation.

### Fixed

- Fast pane creation sending input to the previous terminal.
- Incorrect restored terminal directories affecting Git context and cloning.
- Selected-pane restoration when reopening a workspace with running terminals.
- Browser address editing leaving the wrong pane selected.
- Workspace keyboard navigation, launch-error feedback and inconsistent workspace names.
- Markdown Find losing the first character, Escape closing the entire Git diff, and tooltips obstructing menus.

## 0.2.1 — 2026-09-07

A workbench usability update, with a refreshed default look and a fix for
agent launching on macOS. Existing downloaded theme palettes are preserved.

### Added

- Compact and Comfortable interface density, plus interface scaling from
  100% to 150%, independent of terminal and editor text size.
- A resizable sidebar with a remembered width, a bounded maximum, and
  keyboard and double-click reset controls.
- Clearer theme-pack downloads: inspect included variants, find installed
  themes by search, choose a variant explicitly, and remove a whole pack.
- An empty-workspace start panel and one-click Undo for recently closed panes.

### Changed

- The Default theme now uses neutral black, gray and white with a restrained
  glass-inspired finish. Header controls and interaction styling are shared
  consistently across all themes.
- Slimmer header controls and clearer microphone recording, processing and
  error states, with more room for the waveform and timer.
- Workspace selection lives at the far right of the status bar, with Stash
  immediately beside it even when recovery controls appear.
- Settings has clearer grouping, searchable advanced options and a helpful
  empty-search state. The sidebar shows which pane or folder it follows.

### Fixed

- Agent CLIs installed through Homebrew, npm or other shell-managed paths
  are detected when TermHQ starts from Finder or the Dock. IDE and file
  openers use the same resolved path, and initial launcher lookups run in
  the background.
- Agent and favorite pickers accept numeric-keypad digits as well as the
  number row, including 0 for the tenth entry. Missing-agent feedback now
  distinguishes an unavailable command from an unconfigured agent.
- Keyboard focus and accessible control names across dialogs, menus and
  Git actions, plus overlapping or clipped controls in narrow layouts.

## 0.2.0 — 2026-09-06

The first public release, for Windows and macOS (Apple silicon). Linux is
not published yet. A pre-release in maturity: the installers are not
code-signed, so expect SmartScreen on Windows and Gatekeeper's Open Anyway
on macOS — the [installation page](https://termhq.dev/docs/installation/)
walks through both.

### What TermHQ is, in this version

- **Panes on a grid.** Terminals, browser panes and editor panes side by
  side, arranged by keyboard or by dragging gutters; zoom one to full,
  stash one to a shelf, bring it back.
- **Sessions that survive the window.** Shells live in a detached host, so
  closing TermHQ and reopening it finds your commands still running.
  Workspaces keep a layout each; the taskbar and a picker open them.
- **Built for coding agents.** Every "open a terminal" gesture can start
  Claude Code, Codex or another installed agent CLI in it; idle agents
  raise a toast; a global worktree tracker lists every git checkout under
  the folders you choose, each one a terminal or an agent away.
- **Source control in the sidebar.** Status, staging by file or hunk,
  commits, branches, stashes, worktrees, history and diffs, all through
  your own git.
- **An editor that is not an IDE.** Files as tabs, Monaco underneath,
  language servers you install yourself, reading mode for markdown.
- **Browser panes**, native WebView2 on Windows and WKWebView on macOS.
- **Voice dictation, entirely local**, with speech models you download in
  Settings; nothing leaves the machine.
- **Themes** in the VS Code format, installable from Open VSX, and icon
  themes to match.
- **Updates you control.** TermHQ checks for new versions on its own and
  offers them through a toast and Settings; installing is always your
  click, your layout comes back, and your settings are never touched.
