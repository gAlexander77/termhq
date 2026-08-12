---
title: "Running coding agents"
weight: 60
description: "The parts of TermHQ built specifically for running Claude Code, Codex, and other coding agents."
---

TermHQ is a terminal, so any agent that runs in a terminal runs in it. These are
the parts that exist because of agents specifically.

## Agents come up in colour

Coding agents often render monochrome inside other terminals, and the usual
culprit is not the agent. When one tool launches another, environment variables
leak: a `NO_COLOR=1` set by whatever started your terminal is inherited by every
shell it spawns, and well-behaved programs obey it.

TermHQ scrubs those leaked variables on every shell it starts and sets the
capability variables that say colour is supported. Agents come up in colour
because the environment they are handed is correct, not because TermHQ
special-cases any particular tool.

## Panes are born at their final width

A pane is created at the size it will be displayed at, so a shell's startup
output — and an agent's first banner — is composed for the width you will read
it at rather than reflowed afterwards.

## Watching several at once

Tiling is the point. Four agents working means four panes visible, not four tabs
where three are hidden.

Each pane's font size is independent, so an agent producing a wall of output can
be small while the shell you type in stays comfortable.

## Long jobs survive you leaving

Agents run long. Because shells live in a separate process
([Persistent sessions](/docs/persistent-sessions/)), you can quit TermHQ while
an agent is mid-task and pick it up later with its output intact.

## Directory awareness

TermHQ tracks each pane's working directory, using the shell's own prompt hook
where one is available and falling back to inspecting the process tree where it
is not. The file panel follows the focused pane, so opening a file browser lands
where the agent is working rather than at your home directory.

## Dictating to an agent

Prompts are long, and typing them is the slow part. TermHQ's dictation writes
into the focused pane, so you can talk a prompt at an agent and edit it before
sending.

Transcription is local — a whisper.cpp build shipped with the app. Nothing is
uploaded, which for a tool that sits in front of proprietary source is the only
defensible design.

## Keeping their keystrokes theirs

Agents with full-screen interfaces want chords TermHQ also uses. Ultra focus
turns off every TermHQ shortcut so the terminal receives all of them unmodified.
See [Panes and layout](/docs/panes-and-layout/).
