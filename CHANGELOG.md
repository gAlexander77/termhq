# Changelog

All notable user-facing changes to TermHQ, newest first. This file is rendered
directly at [termhq.dev/changelog](https://termhq.dev/changelog/).

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing yet.

## 0.2.9 — 2026-09-25

### Added

- **Gemini CLI, GitHub Copilot CLI and Cursor CLI** join the agent launchers,
  each with its own product mark. Because a program name alone can belong to
  something else (`agent` is also Grok's, and `copilot` is also AWS's), TermHQ
  asks each one for its help text before listing it, and
  **Settings → Agents** marks one that doesn't match as *not verified*, with
  the reason. Your own launchers keep their commands, flags and order. The new
  ones are added to them once, and one you remove stays removed.
- **Agents you install while TermHQ is open are found.** The list is checked
  again when the window comes back to the front, when Settings or the agent
  picker opens, and with the refresh button in **Settings → Agents**. On Windows this
  includes folders an installer has just added to your `PATH`.
- **Dictation into web pages.** Start dictating over a browser pane and the
  words go into the text field the page has focused, typed the way the page
  expects typing, so its own undo and autosave see them. A page with nothing
  to type into says so before the microphone opens.
- **Startup reports.** Each time the app starts, it sends one anonymous report
  saying it started, on which operating system (Windows, macOS or Linux), and
  which version of TermHQ, so we can estimate how many people use TermHQ and
  how quickly they update. It contains nothing else: no
  account, no device ID, no hardware details, no terminal content, no
  workspace data. Turn it off under **Settings → General → Privacy → Send
  startup reports**. Turning it off sends nothing, and it stays off. See
  [Under the hood](/docs/under-the-hood/#what-reaches-the-network).
- **A middle click closes things**, as on a browser tab: a pane, on its header,
  and a stashed pane, on its row in the stash shelf.
- **Settings → Git → Counts beside the branch in the status bar**, on by
  default. Off, the status bar shows the branch alone. Its tooltip and the Git
  panel still show the counts.

### Changed

- **The stash shelf is a list.** Each parked pane has a row saying what it is
  and where: the terminal's folder, the page's address, the editor's file.
  Panes waiting on you lead the list and glow. **Restore all** and **Close
  all** sit at its foot. Closing a row slides it out and keeps the list open,
  so you can close several in a row. Past eight panes a filter appears. The
  keyboard starts on the first row, the arrows loop through the filter, the
  rows and the foot, and typing filters the list. Any other shortcut puts the
  list away and then does its job.
- **Closing or stashing a pane keeps your place.** The pane that moves into
  its cell takes the keyboard. If the grid loses a column or a row, the pane
  in the same corner does.
- **The branch in the status bar says what its numbers count.** Changed files
  have a dot in your theme's color, and commits to push and pull have the
  same arrows as the Git panel's buttons.
- **The Git tab outside a repository** names the folder and offers
  **Initialize repository…** as its main button. It still asks first, and the
  question now starts on **Cancel**, so an accidental click and Enter do
  nothing.
- **Deleting a workspace that's open in another window** now closes that
  window first, instead of refusing.
- **The workspace picker opens on your most recent other workspace**, so
  opening it and pressing Enter switches to it.
- **Default comes first** in both theme lists. In the terminal theme list it
  follows **Match app theme**.
- **The Files panel no longer flashes "reading…"** when you switch terminals.
  A folder that takes more than five seconds to read says so, and shows
  placeholder rows while it waits.
- **Zooming an editor shows its new size**, as zooming a terminal does.
- **Browser panes move more smoothly.** A page keeps up with its pane while the
  window, a pane border or the sidebar is being resized. Every pane motion
  starts smoothly instead of with a jump, and switching between Grid and
  Columns glides. On macOS a moving or covered page now shows a still of
  itself instead of a blank frame, and its bottom corners follow the pane's
  rounded edge.
- The focus shortcuts move you off a browser pane from its address bar and its
  find bar, as they do from the page.

### Fixed

- A workspace window brought up from the picker or the taskbar's jump list
  could sink behind the window you switched from. It stays in front now.
- A new, empty browser pane lost its "Type an address above to get started"
  prompt and showed a loading placeholder that never finished.
- Opening the command palette or another launcher over Settings canceled a
  speech-model download without asking. It asks first, as closing Settings
  does.
- Clicking the mic while typing in a text field moved the keyboard to the
  terminal until the words arrived. It stays in the field.
- A custom agent whose name merely contained another's, such as
  `my-codex-helper`, wore that agent's mark.

## 0.2.8 — 2026-09-24

### Added

- **SSH panes.** Turn them on under **Settings → SSH**, and **Connect via SSH**
  joins the bottom of the **+** button's shell menu and the command palette. A
  remote session is a pane like any other: it tiles, stashes, maximizes and
  clones (a new connection to the same host). It runs on the OpenSSH client
  already on your machine (Windows' own or Git for Windows' on Windows, the
  system's on macOS), so there is nothing to install on either end. Type a
  host, `user@host:port` or an `ssh://` address, or pick a recent target, a
  saved profile or an alias from your `ssh_config`, all from the keyboard.
  Nothing you type is ever run as a command: anything that looks like one is
  refused with a reason.
- **SSH profiles.** Save a typed target, or edit a saved one: name, host or
  alias, user, port, key file, jump host, and under *More options* a config
  file and a known-hosts file. Passwords, passphrases and host-key questions
  are answered in the pane, by the SSH client itself. TermHQ stores no secret
  and never edits your `known_hosts`.
- **A dropped SSH connection keeps its pane**, with its output and a card that
  says how it ended and shows the exact command that ran. **Reconnect**, or
  Enter in the pane, brings it back in place. Remote panes survive a quit like
  any shell. If their connections are gone after a restart, they come back
  disconnected and wait for you instead of starting a round of logins.
- **Keep-alive** for SSH connections, every 30 seconds by default
  (**Settings → SSH**), so a router or firewall doesn't silently drop a quiet
  session. Set it to 0 to leave it to your SSH config.
- **Backgrounds.** Put a picture, an animated GIF or a looping video behind the
  terminals from **Settings → Appearance → Background**. Add files to the
  library, pick one, and set its **Transparency** (25% by default), **Blur**
  and **Fit**. A video, and a GIF on Windows, also takes a **Speed**, from a
  quarter pace to double. The background is the same in every workspace, like
  the theme.
- **Panes move.** Panes glide when they swap, move or resize, a new pane
  settles into its cell, and a closed one fades from its place. **Maximize**
  grows a pane to fill the grid and **Restore** shrinks it back. Stashing drops
  a pane into the shelf's count, and restoring lifts it back out. The sidebar
  slides in and out, and a workspace appears once it has opened, laid out, in
  one fade. **Settings → Appearance → Animate panes** turns all of it off, and
  so does your system's reduced-motion setting.
- **The command palette opens more than commands.** Beside every action it
  lists your favorite folders, shells, installed agents, other workspaces,
  themes, every Settings page and, with SSH on, your saved and recent SSH
  targets, with what you used last under **Recent**.
- **Your branch in the status bar**: the focused pane's branch, how many files
  have changed and how far it is ahead of or behind its upstream. A click opens
  the Git panel.
- **A right-click menu in terminals** (Copy, Paste, Select all, Clear, Find).
  It is the default on macOS, and a choice under **Settings → Terminal →
  Right-click in a terminal** on Windows, where right-click still copies or
  pastes by default.
- **Find in a terminal** gains match case, whole word and regular expression
  toggles (Alt+C, Alt+W, Alt+R, with Option on macOS), a "3 of 27" count,
  and opens on your selection or your last search.
- **A right-click menu on pane headers**: Rename, Copy path, Reveal, the pane's
  actions and Close. **F2** renames the pane.
- **Restart an ended terminal in place.** The header says "exited · code 1",
  and **Restart** starts the same shell in the same folder.
- **Dim unfocused panes** (**Settings → Appearance**, off by default) washes
  every pane but the focused one toward the theme's background.
- **Empty grid cells offer New terminal and Open file…**, and what you open
  from one lands in that cell.
- **The gutters between panes take the keyboard**: Tab to one, move it with
  the arrow keys (hold Shift for bigger steps), and press Enter to even out its
  two sides.
- **New keyboard actions**, in the palette and bindable under **Settings →
  Shortcuts**: **Jump to the newest waiting pane** (Ctrl+Shift+N, ⌘+Shift+N
  on macOS), **Focus the previous pane**, **Show recently closed panes**,
  **Switch between Grid and Columns**, **Reset pane sizes**, **Restore all
  stashed panes**, **Close all stashed panes** and **Rename the focused pane**.
  Only the first has a default shortcut.
- **Restore all** and **Close all** in the undo list once two or more closed
  panes are waiting, and **Dismiss all** in the waiting list. The Undo chip
  names the pane it brings back.
- **A slow shell says so.** A terminal still starting after ten seconds shows
  "Still starting PowerShell 7… 11 s" with **Cancel**.
- **Receipts**: "Copied" after a copy, "Saved" after an editor save, and a
  note while a folder opens in your IDE.
- **Browser pane headers**: **Reload** turns into **Stop** while a page loads,
  a lock shows over HTTPS and a warning over plain HTTP (never for addresses on
  your own machine), and the **⋯** menu holds DevTools beside a new **Copy
  address**. **Ctrl+Shift+click** (⌘+Shift+click on macOS) on a link in a
  terminal opens it in a browser pane beside the terminal.
- **More of Git from the Git panel**: stage, unstage or discard a whole file
  from its diff, and switch the diff between side by side and stacked. Every
  changed file has a right-click menu, and the arrow keys walk the list.
  **Stash and switch** is offered when local changes block a branch switch,
  **Initialize repository…** appears outside a repository, and **View
  history** on a clean tree.
- **Git status in the Files tree**: changed files are tinted and lettered by
  state, and folders holding changes carry a dot.
- **Drag a file from the Files tree onto a pane**: a terminal gets its path,
  quoted the way that shell reads it, and an editor pane opens it. **Copy
  path**, **Copy relative path**, **File history** and your file openers
  (under **Open with**) join the Files right-click menu.
- **A filter in the worktree tracker** (by repository, branch or folder) once
  there is more than one checkout.
- **Dictate into any text field**: started from the commit box, a search field
  or the address bar, dictation types at the caret.
- Editor tabs that share a name show their folder beside it.

### Changed

- **Settings, redrawn.** Every category is a column of cards, on/off settings
  are switches, and every dropdown works like the theme picker, searchable when
  it is long. Favorite folders, agent launchers and file openers reorder by
  dragging a grip or with the arrow keys. Removing from a list asks first, and
  favorites can be added right in Settings. The agent launchers lead
  **Settings → Agents**, shortcuts show as keycaps, and the theme and icon
  marketplace is a page inside Settings rather than a second dialog.
- **Links in a terminal open on Ctrl+click** (⌘+click on macOS), with a hint
  beside a hovered link. A plain click just focuses the pane or starts a
  selection.
- **Zoom to fill** and **Fullscreen** are now **Maximize** and **Restore**
  everywhere, with icons that match. Double-clicking a pane's name maximizes
  it like the rest of the header; rename moved to the header's right-click
  menu and **F2**.
- The terminal header shows the folder's whole path with your home folder
  spelled out. In a narrow pane the start gives way first, so the folder's own
  name stays visible, and a click on the path copies it. Headers name the shell
  ("Git Bash") when a title only restates the path, and each shows a mark for
  its kind (terminal, browser or editor).
- **Undo close** puts a pane back in its own cell, with the grid as it was,
  when nothing has moved since. Closing or stashing the focused pane hands the
  keyboard to the pane you used before it.
- Arrange mode outlines the pane it moves and its hint says what each arrow
  would do. A dragged pane's label says **Swap**, **Move here** or **Grow**.
- A window too narrow for the sidebar and the grid closes the sidebar first,
  instead of scrolling the panes sideways, and reopens it once there's room.
- On macOS, ⌘+W closes the focused pane (or an editor's tab) instead of the
  whole workspace window, and **Undo close** can bring it back. In Arrange
  mode, ⌘+arrow shrinks a pane, since Ctrl+arrow belongs to Mission Control.
- The agent picker names the pane it will type into. A launch into a shell
  that's already running an agent opens a new pane of the same shell and
  folder. With no agent found, the header's launcher stays, dimmed, and opens
  **Settings → Agents**.
- Ctrl+wheel zoom steps once per notch, takes a trackpad pinch without
  overshooting, works over editor panes, and briefly shows the new size.
- The multi-line paste card previews what will go in and offers **Paste as one
  line**.
- The Git panel is more compact: repository, branch and sync share one band,
  the message box grows from one line to eight, **Commit** and its menu are
  one button, amending is a chip whose × brings back your earlier draft, and
  **Stage all and commit** sits beside "nothing staged". Rows lead with the
  file, and a partly staged file shows a half-filled mark.
- Fetch has its own button, and Pull, Push and Publish spin while they run. The
  branch picker opens at once and fills in, with local and remote branches in
  separate sections. History gains Home and End and a count, and its commit
  messages can be selected.
- In the Files panel, ← goes to the parent folder's row, Backspace goes up a
  folder, typing jumps to a matching name, and the ".." row is gone. Search has
  a toolbar button and a result count.
- A Git-ignored file in the Files panel keeps its normal look with a slightly
  gray name, the way code editors show them, instead of a dimmed row and icon.
- The sidebar tabs wear icons, and the Git tab shows how many files have
  changed.
- In the workspace picker, a rename saves on Enter or click-away (Esc cancels),
  Rename and Delete appear on every row, and a filter appears past eight
  workspaces.
- The title bar's new-pane menu marks your default shell and its shortcut, and
  its tooltips name your current shortcuts.
- The start page puts the keyboard on **New terminal**, so Enter opens one, and
  strikes through a favorite whose folder is gone. With every pane stashed it
  keeps its usual look, plus **Show stashed panes** with the count and
  shortcut.
- The update notice shows the release's headline, offers **Later** and **What's
  new**, and no longer covers the status bar.
- Every confirmation is the same dialog, and removing a favorite asks in place:
  its × turns into **Remove?**.
- A failed settings save and a shell that fails to start show in the status bar
  with **Retry**, instead of a banner that resized every pane.
- Menus jump to a row by its first letter and scroll when taller than the
  window. Tooltips wait for the pointer to settle, and never catch a click or
  the first Escape.
- Light themes get lighter shadows, and keyboard focus is the same ring
  everywhere. Downloaded themes whose secondary text, links, warnings or Git
  colors are too faint are lifted to a readable contrast (the theme file is
  untouched).
- With reduced motion on, every animation stops. Screen readers hear named
  menus, each file's depth in the tree, and speech-model download progress.

### Security

- On Windows, a link printed in a terminal was opened through the command
  shell, so a crafted link could run a command when clicked. Links now go
  straight to your browser, web addresses only, and a file name with `&` in it
  opens correctly from Open, Open in IDE and the file manager.

### Fixed

- A setting changed in one workspace window is no longer undone by another
  window's next save, and themes, backgrounds and favorites reach every open
  window at once.
- A `config.json` with a typo is no longer replaced by defaults. It is kept
  aside as `config.json.broken-…`, and a notice names the error with a button
  to its folder.
- An editor's "deleted on disk", "changed on disk" or "save failed" card no
  longer takes the keyboard from the terminal you're typing in, where the next
  Enter could write back a file an agent had just deleted.
- **Update and restart** asks about unsaved files first, then counts the
  running terminals in every workspace, not just this window.
- **Commit All**, **Amend Last Commit** and **Undo Last Commit** closed the
  commit menu instead of running; they work now. **Commit** can't run twice.
- On nine of the ten built-in themes, Git colors were missing: stage marks in
  the diff view were invisible and History's counts and tags were uncolored.
- After a reboot, a host restart or **Update and restart**, panes come back
  where they were instead of stacked or leaving gaps. A terminal whose shell
  ended while TermHQ was closed comes back as a fresh prompt in its folder.
- Switching between the Files and Git tabs no longer loses your commit message,
  amend mode, expanded folders, or a push or pull still running.
- Themes with a transparent accent color now show focus rings, primary buttons
  and progress bars.
- At startup, Enter in the workspace picker opens the highlighted workspace
  instead of creating an empty one.
- Pane paths lose Windows' trailing backslash, Command Prompt panes keep up
  with the folder you `cd` into, and an empty workspace is named "Workspace 9",
  not "window-9".
- The palette finds every word you type, in any order.
- The Git panel explains why it can't read a folder (Git missing or older than
  2.23, or a permission error), with **Retry**, instead of reading forever.
  With the sidebar pinned, the palette's Git commands act on the pinned
  repository.
- Stash apply, pop and drop act on the stash you picked, even if the list
  shifted.
- A workspace returns in the Grid or Columns mode it was arranged in.
- A font zoom sticks through **Undo close** and a relaunch.
- A path dropped into Git Bash keeps its backslashes, and a drop onto a pane
  that can't take it says why.
- Dictation can always be stopped and says why it failed, and the mic test no
  longer leaves the microphone on.
- A transcript whose terminal closed while it was being transcribed goes to
  the terminal you are in, instead of the closed one.
- Shortcuts no longer fire while you type in the app's own text fields, and a
  shortcut the app can't act on passes through to the program in the pane.
- The editor's unsaved-changes question no longer freezes the app.
- The Git panel stays responsive in large repositories.
- **Git: View File History** from the palette opens the history of the file in
  the focused editor, instead of saying the file isn't inside the repository.
- Escape in the worktree tracker's filter clears the filter first, instead of
  closing the tracker.
- On Windows, **Find** from the command palette over a browser pane gives the
  page the keyboard and says to press Ctrl+F there, instead of doing nothing.
- After closing Settings, or another dialog opened with the mouse, typing
  reaches the terminal again. On Windows, Enter no longer reopened Settings.
- On macOS, Escape in a dialog no longer types an ESC into the terminal behind
  it. In Claude Code, that interrupted the agent.
- On macOS, the window buttons stay in line with the toolbar when the window's
  title changes.
- On Windows, launching an agent into a Command Prompt or PowerShell pane no
  longer puts a stray `^U` in front of the command, which then failed as "not
  recognized".
- Stashing a browser pane while its page had the keyboard left nothing
  selected, so the pane shortcuts did nothing until you clicked a pane. The pane
  you used before it is selected now. Maximizing a terminal while a page had
  the keyboard no longer selects the hidden browser behind it.
- A zsh pane brought back by **Undo close** or a restore no longer shows a
  stray `%` above the prompt.

## 0.2.7 — 2026-09-20

### Added

- **Hold to talk.** Opt in under **Settings → Voice** and holding the space bar
  in a terminal for a moment starts dictating; let go and it transcribes — the
  gesture Claude Code's own dictation uses, here for every program. A tap still
  types a space, and a key pressed mid-hold flushes the space ahead of it. The
  key is yours to change by pressing it: any single key, Right Ctrl included.
  Off by default, because on Space it takes the hold away from Claude Code's
  own dictation; on a key of its own, both work.
- **The cursor shows the dictation.** While recording, the terminal's cursor
  becomes a bar that rises with your voice — gray in a quiet room, cycling
  through color the moment it hears you. While transcribing it is a chrome
  block with the light traveling upward, in time with the mic's three dots and
  the *Transcribing…* label.
- **Grok Build** joins the agent launchers beside Claude Code, Codex, OpenCode
  and Antigravity, shown once its `grok` command is on your PATH. Existing
  installs pick it up on their own.
- **Restore all** and **Close all** on the stash count's right-click menu.
  Restore asks first when the panes in the grid plus the ones on the shelf
  would exceed nine; Close all always asks, and says what closing means under
  your Undo close setting.
- **Restore last closed terminal** has a default shortcut: Ctrl+Shift+R
  (⌘+Shift+R on macOS).
- The title bar's **+** button reaches further: right-click a shell for your
  favorite folders, then right-click a favorite for the agent to start there.
  Rows that hold a flyout now carry a chevron.
- **Committer pictures** in Git History — a GitHub noreply address names its
  account, anything else asks Gravatar — cached after the first fetch.
  **Settings → Git → Committer pictures in History** turns the lookups off.
- A word before the **tenth browser pane** opens onto the grid (stashed panes
  not counted): every pane is a native webview with its own renderer process.
  *Open anyway*, *Don't warn again*, or the switch under **Settings →
  Browser**.
- Git-ignored files and folders are **dimmed** in the Files panel, with an
  *Ignored by Git* tooltip. They stay visible and openable.
- Diffs open on their first change, and **Previous change** / **Next change**
  step through the rest — in History as well as in Changes.
- An empty editor pane has an **Open file…** button.
- Each launcher row in **Settings → Agents** says whether its command was
  found on PATH, so an agent missing from the menu is explained where you
  would look.
- Settings search results carry the name of the category they came from.

### Changed

- Dictation lands in the terminal you started it in, even if you click into
  another pane while it records or transcribes — the dictation cursor stays
  there too. Only if that pane is gone by then does the focused terminal take
  the words.
- One-click destructive actions now ask first: deleting a branch from the
  picker, removing a worktree, deleting a speech model, deleting a workspace
  (the ask names it, counts its panes and says its shells will end), and
  **Update and restart** while terminals are open.
- The empty workspace shows the TermHQ mark and name, centered.
- The command palette opens on the first row that can actually run.
- Workspaces that share a name show their slot beside it in the picker.
- **Settings → Voice** says at the top why dictation cannot run, before it
  offers anything to download.
- On macOS: the window buttons align with the toolbar, the commit box says
  ⌘+Enter, the Files menu offers TextEdit rather than Notepad, and prose about
  the Windows taskbar menu appears only where that menu exists.

### Fixed

- `git log` pages again in every shell. A coding agent that launched TermHQ
  handed its `PAGER=cat` and `GIT_PAGER=cat` to every terminal; those are
  scrubbed now, while a pager you set yourself is kept.
- On Windows, **New workspace** could fail with "The request is not supported"
  when TermHQ had been started from a console. It opens reliably now.
- A freshly opened or restored terminal is no longer flagged as *waiting*
  before you have run anything in it: the terminal's own replies to the app no
  longer count as typing.
- The theme picker's search box stays put while its rows scroll.
- Saving a file refreshes its row in the Files panel, so the size shown is the
  size on disk.
- Settings saves, browser page loads, the Files panel and the grid's columns
  report failure instead of silently falling behind: a failed save keeps the
  previous config intact and offers **Retry**; a page that fails to load keeps
  the address in the bar and offers **Retry** or **Open externally**; Files
  picks up external changes to the folders it shows.

## 0.2.6 — 2026-09-11

### Added

- **Rename** and **Delete** in the Files panel: every file and folder menu ends
  with **Rename…** and **Delete…**, and a focused row answers **F2** and
  **Delete**. Rename edits the name in place with the name (not the extension)
  preselected. Delete asks first and moves the item to the Recycle Bin (Trash
  on macOS) — nothing is ever deleted outright.
- Keyboard-operable menus: a row's context menu opens with **Shift+F10** or the
  menu key, the shell rows ("Open in PowerShell" and the like) open their agent
  flyout with **→** and close it with **←** or **Esc**, and menus stay open until you click elsewhere
  or press Esc.

### Changed

- On macOS, all workspaces now belong to one application: one Dock icon, every
  workspace in the Window menu, each window keeping its own terminals, editors
  and language servers.
- On macOS, the standard Edit-menu actions (Select All, Undo, Cut, Copy, Paste)
  work inside editors and terminals; in a browser pane, ⌘L, ⌘[, ⌘], ⌘R and ⌘= /
  ⌘+ act on the address bar, history, reload and zoom.
- Dragging a pane targets the exact grid track under the pointer, including
  uneven column and row sizes.
- Directory listings and file operations in the Files panel run off the window's
  thread, so a slow network or cloud folder cannot freeze the app.

### Fixed

- Switching between open workspaces on Windows leaves the keyboard in the
  window you switched to — no click needed.
- Reopening a workspace selects the pane that was active when it was saved, and
  a pane that has just appeared no longer takes keyboard focus from the one you
  selected.
- A stashed or zoomed-away terminal no longer resizes to a tiny size underneath
  a running full-screen program, so its layout is intact when it returns.
- Launching an agent right after using a menu no longer loses the first
  characters of the command.
- Picking a workspace whose window has gone shows the reason instead of
  silently doing nothing.
- A folder menu opened near the bottom of the window stays fully on screen.

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
