# Changelog

All notable user-facing changes to TermHQ, newest first. This file is rendered
directly at [termhq.dev/changelog](https://termhq.dev/changelog/).

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing yet.

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
