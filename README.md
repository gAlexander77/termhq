<p align="center">
  <img src="site/public/termhq-mark.svg" alt="TermHQ" width="96">
</p>

<h1 align="center">TermHQ</h1>

<p align="center"><strong>A GUI terminal built for coding agents.</strong></p>

<p align="center">
  <img alt="Windows" src="https://img.shields.io/badge/Windows-0078D4?style=flat-square&logo=windows&logoColor=white">
  <img alt="macOS" src="https://img.shields.io/badge/macOS-000000?style=flat-square&logo=apple&logoColor=white">
  <img alt="Linux" src="https://img.shields.io/badge/Linux-1a1a1a?style=flat-square&logo=linux&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-pre--release-111111?style=flat-square">
</p>

---

> **TermHQ has not been released yet.** There are no downloads on this
> repository, and the links below to the website and release page will start
> working at launch. This page describes what TermHQ is; it does not yet
> describe something you can install.

## What TermHQ is

Terminal emulators were designed for a person typing one command at a time.
That is not how anyone works with coding agents. You run several at once, you
want to see all of them, you want the one that finished to stop being the one
you have to hunt for — and you do not want any of them to die because you
closed a window.

TermHQ is a terminal workbench built around that. Panes tile instead of
stacking behind tabs, with no limit on how many, sized by dragging the boundary
between them. Terminals keep running after you quit the app. A pane can hold a
web page or a file instead of a shell. Work is grouped into workspaces you can
leave and come back to. Dictation runs on local Whisper models, on your own
machine.

It is a terminal, not an IDE. There is an editor in it, but it is there for the
edit you make *while* something else is running — not to replace the one you
already have open.

## Capabilities

- **Tiling panes** — every terminal visible at once, in a grid or in columns,
  arranged from the keyboard or by dragging pane headers to move, swap and grow.
  Drag the boundary between two panes to resize them: the panes touching it
  follow, the ones that do not stay put, and a workspace remembers the
  proportions you set.
- **Browser panes** — `Ctrl+Shift+B` tiles a real web page in the grid, rendered
  by the operating system's own browser engine embedded in the window, with a
  URL bar, devtools and the same drag, stash, resize and fullscreen moves as a
  terminal. Verified on Windows; macOS and Linux passes are in progress.
- **Editor panes** — `Ctrl+Shift+E` opens a pane that holds files as tabs, built
  on Monaco. Saving swaps a temp file into place so a failed save cannot destroy
  the original; a file changed underneath you asks rather than clobbers; unsaved
  text is mirrored so a crash does not take it. Markdown reads rendered, in the
  tab or split beside the source.
- **Language servers, yours not ours** — diagnostics, hover, completion,
  go-to-definition and formatting from servers **you** install, launched on
  demand per project. TermHQ bundles none, ever, so nothing here disagrees with
  your toolchain. Ships ready for rust-analyzer, gopls, pyright,
  typescript-language-server and clangd; works with anything speaking LSP.
- **Shells that outlive the app** — terminals run in a detached host process,
  tmux-style. Quit TermHQ, reopen it, and your sessions are still running with
  their scrollback intact.
- **Workspaces** — named groups of panes with their own layout and working
  directories. Resume the one you were in, or pick from a list on launch.
- **Built for agents** — launch Claude Code, Codex, OpenCode or Antigravity from
  a pane-header menu or a number key, with your own flags; panes are sized so an
  agent's output is composed at the width it will be read at; color capability
  is forced on so agents render in color; and a pane that goes quiet after being
  busy tells you so.
- **Local voice dictation** — powered by whisper.cpp, with transcription
  running on your machine. Speech models are downloaded (or imported) in
  Settings rather than bundled, so the installer stays small and voice is
  strictly opt-in. English plus sixteen other languages; not packaged for
  Linux yet.
- **Files and git, in view** — a file tree that follows the focused pane's
  directory, and a Git viewer: status, diffs, and conflicts at a glance,
  branch switching, and syncing. Conflicts open read-only with hand-off to
  your editor — or a composed resolve prompt copied for whichever AI you
  trust.
- **Theming** — JSON themes applied as CSS variables, with VS Code theme import
  via Open VSX.
- **Undo close** — closing a terminal is reversible for a few seconds; the shell
  keeps running underneath the whole time.

## Platforms

Windows, macOS, and Linux. Windows is the primary daily-driver target and macOS
is developed alongside it. Linux is built and published, but has had less
exercise — and voice dictation is not packaged for it yet.

## How it is built

TermHQ is a Rust application. Everything that touches your system — shells and
PTYs, session persistence, files, git, speech — is native Rust. The core is
built from scratch for this app: the session engine (a small background
process that owns your shells, which is why they survive the window — no
`tmux` involved), the tiling grid, the theming system, the keymap, and the
Git panel.

Two engines are borrowed rather than rebuilt, because they are the acknowledged
best of their kind: [xterm.js](https://xtermjs.org/) draws the terminals and
[Monaco](https://microsoft.github.io/monaco-editor/) is the editing surface —
the same two VS Code uses.

The interface renders in the operating system's own webview via
[Tauri](https://v2.tauri.app/) — no bundled browser — which is why installers
are measured in megabytes, not hundreds of them. That same engine is what a
browser pane embeds, so a web page in the grid is the real thing rather than a
streamed picture of one — and it is given none of the application's
permissions. Terminals are rendered by
xterm.js; dictation runs on
[whisper.cpp](https://github.com/ggml-org/whisper.cpp); git runs through the
`git` on your `PATH`; and language intelligence comes from LSP servers you
install yourself.

## Links

| | |
|---|---|
| Website | [termhq.dev](https://termhq.dev) *(at launch)* |
| Documentation | [termhq.dev/docs](https://termhq.dev/docs) *(at launch)* |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Downloads | [Releases](../../releases) *(at launch)* |

## Reporting a problem

Once TermHQ is public, bug reports and feature requests belong in this
repository's [Issues](../../issues). Please include your OS and version, the
TermHQ version, and what you expected to happen.

## Privacy

TermHQ runs locally. Dictation runs on local Whisper models — transcription
happens on your own machine. Models are downloaded only when you ask for one,
from the whisper.cpp project's public model repository, and the app works
fully without one. Theme and extension downloads are user-initiated and come
from [Open VSX](https://open-vsx.org/).

A browser pane goes wherever you point it, like any browser, and its cookies
and logins live in the browser engine's own profile on your machine. The page
is given no access to TermHQ: it holds none of the application's permissions
and cannot reach it.

## About this repository

This is TermHQ's user-facing home: the website, the documentation, the
changelog, and the releases. The application source is maintained privately and
is not published here. Releases are built from that private source at an exact
tagged commit and published to this repository.

## License

Licensing is not final. A license file will be added before this repository is
made public.
