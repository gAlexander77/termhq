---
title: "Source control"
weight: 65
description: "Review, stage and commit changes, browse history, manage branches, sync, resolve conflicts, use stashes and worktrees — without leaving the workspace."
---

Open **Source Control** in the sidebar to work with the repository belonging to
the pane you are focused on. Move to a pane in another project and the panel
follows it, just like Files.

The top of the panel shows the repository and branch, followed by two clear
views:

- **Changes** is the working view: changed files, staging, commits, conflicts,
  stashes and worktrees.
- **History** opens the commit graph and its search and file-history tools.

## Review and stage changes

Files are grouped as **Merge Changes**, **Staged Changes**, and **Changes**. A
partly staged file appears in both staged and unstaged groups, so the panel never
hides the part you have not committed yet.

Use the actions beside a file or group to stage, unstage, or discard it. A
discard confirmation tells you what the file will return to. Untracked files go
to the operating system's recycle bin or trash rather than disappearing
permanently.

Click a file to open its diff. Diffs can be side by side or stacked, controlled
from **Settings → Git → Diff layout**. From an unstaged diff, select a change in
the gutter to stage just that hunk; from a staged diff, use the same gesture to
unstage it. If the file changed after the diff opened, TermHQ refreshes instead
of applying an action to stale content.

Binary files and files too large to preview are labeled rather than shown as
garbled text. New files appear as additions, and deleted files can be staged as
a whole.

## Commit what you staged

The main **Commit** button records exactly what is in **Staged Changes**.
<kbd>Ctrl</kbd>+<kbd>Enter</kbd> commits from the message box without reaching
for the pointer.

If the repository cannot be committed, the reason appears below the box — for
example, nothing is staged, conflicts remain, or an operation is in progress.
The menu beside Commit also offers:

- **Commit All** — stages everything first, then commits it.
- **Amend Last Commit** — loads the last message and warns when the next push
  will need force.
- **Undo Last Commit** — removes the latest commit while leaving all of its
  changes staged. Your files are not lost.

## Browse history

Choose **History** to see the repository's commit graph. Each row shows its
branches and tags, author, message, and relative time. Select a commit for its
full message and changed files, then open any file to compare that version with
its parent.

Search accepts message text, `author:name`, or a commit ID. **Refresh** brings
new commits into the graph without shifting the history you were already
reading.

From a selected commit you can copy its ID, create a branch there, or open it on
the repository's host when TermHQ recognizes the remote. **View File History**
follows a file through renames and shows the path it had at each commit. It is
also available from the command palette.

## Branches and syncing

The branch picker is searchable and lists recently used branches first by
default. From it you can:

- switch to a local or remote branch
- create a branch by typing a new name
- rename or delete a local branch
- see when a tracked upstream branch is gone

Deleting a branch that is not fully merged requires a second, explicit
confirmation.

Fetch, pull, and push sit beside the current branch with ahead and behind
counts. A branch without an upstream offers **Publish**. TermHQ follows your Git
configuration when choosing a remote and asks when there is no honest default.

Pull is fast-forward-only by default, so a diverged branch stops instead of
creating a surprise merge. You can choose rebase or merge in **Settings → Git**.
After a rejected push, the panel can offer **Pull with rebase**. A force push is
available only with a protective lease: if someone else updated the remote
after the version you confirmed, the push stops rather than overwriting their
work.

## Resolve conflicts

An in-progress merge, rebase, cherry-pick, or revert gets a banner that says
what is happening and how many files still need a decision. **Continue**,
**Skip** where supported, and **Abort** are available in the same place; Abort
confirms what it will discard.

Select a file under **Merge Changes** to open it in an editor pane. Each conflict
block offers **Accept Current**, **Accept Incoming**, or **Accept Both**, and you
can edit the result normally before staging it. The labels stay tied to Git's
own sides during a rebase, where “current” and “incoming” are easy to read
backwards.

You can also compare the two sides of a conflict, or choose **Copy AI prompt**.
That copies a concise briefing — affected files, which side is which, and the
instruction to resolve and stage without committing — ready for whichever AI
you trust.

## Stashes and worktrees

The **Stashes** section lets you create a stash with an optional message and
include untracked files when needed. Expand a stash to review its files and
diffs, then apply, pop, or drop it. Dropping confirms first because those
changes may exist nowhere else.

The **Worktrees** section lists the repository's other working folders. Create a
worktree on a new branch, open a terminal in one, or remove it. If a worktree
still has changes, TermHQ shows Git's refusal before it offers a forced removal.

## Command palette and errors

The command palette includes actions for opening Source Control or History,
viewing file history, committing, staging or unstaging everything, fetching,
pulling, pushing, switching branches, stashing, and refreshing. These actions
do not take more keyboard shortcuts away from your shells.

When Git refuses an action, the message appears beneath the repository header
with a plain-language summary and suggested next step. Expand it when you need
Git's complete response. Background fetch failures stay quiet while their
ahead/behind counts are marked stale, so going offline does not produce a new
warning every few minutes.

TermHQ uses the `git` already on your `PATH`, along with your configuration and
credential helpers. Repositories reached through WSL paths are not supported
yet; see [Troubleshooting](/docs/troubleshooting/).
