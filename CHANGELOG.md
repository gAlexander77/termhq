# Changelog

All notable user-facing changes to TermHQ, newest first. This file is rendered
directly at [termhq.dev/changelog](https://termhq.dev/changelog/).

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing yet.

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
