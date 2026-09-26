---
title: "Source control"
weight: 65
description: "Review, stage and commit changes, browse history, manage branches, sync, resolve conflicts, and work with stashes and worktrees."
---

Open the **Git** tab in the sidebar — or run "Git: Open the Git panel" from the
command palette — to work with the repository belonging to the pane you are
focused on. Move to a pane in another project and the panel follows it, just
like Files. The tab counts the files that changed; while files are conflicted, a
badge with their count takes its place (**Settings → Git → Conflict count on the
Source Control tab** turns the badge off).

A browser pane or an [SSH pane](/docs/ssh/) has no local folder, so the panel
does not follow one: while it has focus, the panel shows the repository of the
folder the Files tab is on. The **Pin** beside the sidebar's "Following …" line
holds the panel on one folder's repository whatever you focus, and the
palette's Git actions and the conflict badge follow the pin too.

One band across the top holds the repository's name, its branch, and the sync
controls. Under it are two views:

- **Changes** is the working view: changed files, staging, commits, conflicts,
  stashes and worktrees.
- **History** opens the commit graph and its search and file-history tools.

The refresh button beside those two reads the repository again right away
instead of waiting for the next check.

## Review and stage changes

Files are grouped as **Merge Changes**, **Staged Changes**, and **Changes**;
click a group's header to fold it. A partly staged file appears in both staged
and unstaged groups, so the panel never hides the part you have not committed
yet — its staged row carries a half-filled circle to say so.

Each row shows the file's status letter, its icon and its name, with its folder
dimmed after it. The row's actions appear as icons when you hover or focus it:
open the file, discard, stage or unstage. Right-click any row for the full set —
**Open the diff**, **Open the file**, **Stage** or **Unstage**, **Discard
changes…**, **File history**, **Copy path**, and **Reveal in File Explorer**
(**Reveal in Finder** on macOS). The group headers carry **stage all**,
**unstage all** and **discard all**.

The file list takes a single Tab stop: the arrow keys, <kbd>Home</kbd> and
<kbd>End</kbd> walk its rows, and <kbd>Enter</kbd> opens the one you are on. A
group with more than 300 files shows the first 300 and a **Show all** button
with the count. A submodule is a repository rather than a file, so clicking it
opens a terminal inside it instead of a diff.

A discard confirmation tells you what the file will return to. Untracked files
go to the operating system's recycle bin or trash rather than disappearing
permanently.

Click a file to open its diff. It opens on the first change; step through the
rest with the arrows either side of the **Change 1 of 7** list, or pick one from
it. From an unstaged diff, click a change's gutter mark — or **Stage change** —
to stage just that hunk; from a staged diff, the same gesture unstages it. Stage
the last change and the overlay says **All staged.**, with **Next file** to move
on. The overlay's header also stages or unstages the whole file, discards its
changes (asking first), steps to the previous or next file in the group, and
switches that diff between side by side and stacked; **Settings → Git → Diff
layout** chooses which one diffs open in. If the file changed after the diff
opened, TermHQ refreshes instead of applying an action to stale content.

Binary files and files too large to preview are labeled rather than shown as
garbled text. New files appear as additions, and deleted files can be staged as
a whole.

## Commit what you staged

The main **Commit** button records exactly what is in **Staged Changes**, and
shows how many changes that is. <kbd>Ctrl</kbd>+<kbd>Enter</kbd>
(<kbd>⌘</kbd>+<kbd>Enter</kbd> on macOS) commits from the message box without
reaching for the pointer. The box starts at one line and grows with your
message, up to eight.

While a commit runs — your hooks, a signing prompt — the button reads
**Committing…** and the box is read-only, so the same commit cannot start twice.
A finished commit shows as a brief note rather than a banner.

If the repository cannot be committed, the reason appears below the box — for
example, nothing is staged, conflicts remain, or an operation is in progress.
Beside "nothing staged", **Stage all and commit** does both at once. The menu
beside Commit also offers:

- **Commit All (stage everything first)** — stages every change, untracked
  files included, then commits it.
- **Amend Last Commit** — switches the box to amending, marked by a chip above
  it. An empty box gets the last commit's message, and a note warns that a
  commit you already pushed will need a force push. The chip's **×** returns to
  a normal commit and brings back the draft you had before.
- **Undo Last Commit** — asks first, then removes the latest commit while
  leaving all of its changes staged. Your files are not lost; the commit's
  message returns to an empty box, and a draft you were writing is kept.

## Browse history

Choose **History** to see the repository's commit graph. Each row shows its
branches and tags — two at most, then a count such as **+2** — its author with
their picture, the message, and a relative time. The header counts what is
loaded, such as "100+ commits" while there is more to scroll to. The arrow keys
move between commits, and <kbd>Home</kbd> and <kbd>End</kbd> jump to the ends of
what is loaded.

Select a commit for its full message — selectable, so you can copy from it —
and its changed files, then open any file to compare that version with its
parent. The diff opens on its first change, and the arrows either side of the
**Change 1 of 7** list step through the rest. From a commit's diff, **open
current file** opens the file as it is in your working tree today, not that
commit's version.

Committer pictures come from GitHub for noreply addresses and from Gravatar
otherwise, cached after the first fetch; **Settings → Git → Committer pictures
in History** turns the lookups off and shows initials instead.

Search accepts message text, `author:name`, or a commit ID. The graph is a
snapshot, so new commits never shift the history you are reading; if HEAD moves
while it is open, a banner says so. **Refresh** reads the graph again from the
current tip.

From a selected commit you can **copy id**, **branch from here**, or — when
TermHQ recognizes the remote's host, such as GitHub or GitLab — **open on** that
host, which opens the commit's page in a [browser pane](/docs/browser-panes/).
**File history** follows a file through renames and shows the path it had at
each commit. Open it from a changed file's right-click menu here, or from any
file's right-click menu in the Files panel.

## Branches and syncing

Click the branch in the top band for a searchable picker, with **Local** and
**Remote** branches in sections of their own and the most recently committed
first by default (**Settings → Git → Branch order**). Each row shows its last
commit's subject, and the branch you are on is badged **current**. From it you
can:

- switch to a local or remote branch
- create a branch by typing a new name
- rename or delete a local branch
- see when a tracked upstream branch is gone

Deleting a branch asks first, and a branch that is not fully merged asks a
second, explicit time. If uncommitted changes block a switch, the message that
says so offers **Stash and switch**: it stashes them, untracked files too,
switches, and leaves the stash in the list.

Fetch, pull, and push sit at the end of the top band, with ahead and behind
counts when there is something to push or pull. **Fetch** has an icon of its
own, and each of them spins while it runs. The counts are only as fresh as the
last fetch, so their tooltips say when that was — and **Pull** stays enabled even
when the last count said there was nothing to pull. **Push** is disabled when
there is nothing to push. A branch without
an upstream offers **Publish**, which also spins while it works. TermHQ follows
your Git configuration when choosing a remote, and when several remotes leave
no clear choice, it says so rather than guessing.

Pull is fast-forward-only by default, so a diverged branch stops instead of
creating a surprise merge. You can choose rebase or merge in **Settings → Git →
Pull style**. After a rejected push, the panel can offer **Pull with rebase**. A
force push is available only with a protective lease: if someone else updated
the remote after the version you confirmed, the push stops rather than
overwriting their work.

## Resolve conflicts

An in-progress merge, rebase, cherry-pick, or revert gets a banner that says
what is happening and how many files still need a decision. **Continue**,
**Skip** where supported, and **Abort** are available in the same place; Abort
confirms what it will discard.

Select a file under **Merge Changes** to open it in an editor pane. Each conflict
block offers **Accept Current**, **Accept Incoming**, or **Accept Both**, and you
can edit the result normally. When it is done, **Mark resolved** on its row
stages it — asking first if conflict markers are still in the file. The labels
stay tied to Git's own sides during a rebase, where “current” and “incoming” are
easy to read backwards.

You can also compare the two sides of a conflict, or choose **copy AI prompt**
on the Merge Changes header. That copies a concise briefing — affected files,
which side is which, and the instruction to resolve and stage without
committing — ready for whichever AI you trust.

## Stashes

Stash your working changes with **stash…** on the **Changes** header — it
appears only when there is something to stash — or with "Git: Stash Changes" in
the command palette. The message is optional, and the **untracked** box starts
ticked, so files Git is not tracking yet go into the stash too.

The **Stashes** section lists what you have. Expand a stash to review its files,
untracked ones included, and open their diffs, then apply, pop, or drop it. Each
action works on exactly the stash you picked: if the list changed since it was
shown, TermHQ reads it again and asks you to try once more instead of touching a
different stash. Dropping confirms first because those changes may exist nowhere
else.

## Worktrees

The **Worktrees** section lists the repository's working folders. **add
worktree…** creates one on a new branch: type the branch name and the folder
beside it fills in to match, until you edit the folder yourself. <kbd>Enter</kbd>
creates it, and the button reads **Creating…** while Git works. Every other
checkout has a button that opens a terminal there. Removing a linked worktree
asks first — its folder is deleted, while the branch and its commits stay — and
one with uncommitted changes asks a second time, with **Force remove**, because
those changes would be lost.

For a view across several repositories, add one or more folders under
**Settings → Git → Worktree roots**. A **Worktrees** item then appears in the
status bar, grouping every checkout it finds by repository and putting a
terminal, agent, IDE, or file-manager action on each row. See the complete
[Worktrees guide](/docs/worktrees/).

## Command palette and errors

The command palette has the panel's actions by name, each starting with "Git:"
— open the Git panel or History, commit, stage or unstage everything, fetch,
pull, push, switch branch, stash, and refresh. None has a keyboard shortcut by
default, so they take no keys away from your shells.

When Git refuses an action, the message appears beneath the repository header
with a plain-language summary and suggested next step, and its text can be
selected and copied. Expand it when you need Git's complete response. Background
fetch failures stay quiet while their ahead/behind counts are marked **stale**,
so going offline does not produce a new warning every few minutes.

TermHQ uses the `git` already on your `PATH`, along with your configuration and
credential helpers. Repositories reached through WSL paths are not supported
yet; see [Troubleshooting](/docs/troubleshooting/).

## When there is no repository to show

- If the first read of a folder fails — Git missing or too old, a permissions
  problem — the panel says **Source Control can't read this folder**, gives the
  reason, and offers **Retry**. When the cause looks like a missing or old Git,
  it adds that Source Control needs git 2.23 or newer.
- Outside a repository, the panel says **No repository here**, names the
  folder, and offers **Initialize repository…**, which runs `git init` there
  after asking. The question starts on **Cancel**, so a click by mistake
  followed by <kbd>Enter</kbd> changes nothing.
- A clean working tree says so, and offers **View history**.

## Elsewhere in the app

- While the sidebar is open, the status bar shows the branch of the repository
  the Git panel is showing — at its left, after the Worktrees item if you track
  worktrees. Beside it, a dot in your theme's color counts changed files, and
  the push and pull arrows count commits ahead of and behind the upstream;
  hover it for the counts in words. Click it to open the Git panel.
  **Settings → Git → Counts beside the branch in the status bar** turns the
  counts off and keeps the branch.
- Switching between the Files and Git tabs keeps your commit message, amend
  mode, and a push, pull or commit that is still running.
- A file's right-click menu in the Files panel has **File history**, which opens
  that file's history here.
- Inside a repository, the Files tree tints and letters changed files — see
  [The editor](/docs/editor/#the-files-panel-while-you-edit).
