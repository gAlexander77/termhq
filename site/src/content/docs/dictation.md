---
title: "Dictation"
weight: 62
description: "Talk into a terminal: on-device transcription with a local Whisper model, started from a button, a chord, or a held key, with a cursor that shows it listening."
---

TermHQ types what you say into a terminal. Transcription happens on your own
machine, on a Whisper model you download once — nothing is sent anywhere, which
matters for a terminal sitting in front of proprietary source. It exists
because prompts to coding agents are long and typing them is the slow part, but
it works at any shell prompt.

## Before the first word

The installers ship without a speech model, so a fresh install shows no mic
button at all. Open **Settings → Voice**, download a model (or import one you
already have), close Settings, and the button appears in the title bar. The
panel says at the top whether dictation can run on this build and whether a
model is ready, before it offers anything to download.
[Installation](/docs/installation/#voice-dictation) covers the models and their
sizes; **Test microphone** in the same panel plays a few seconds back through
the exact capture path dictation uses, so a silent microphone is found before
any words are spent on it.

Linux support is pending.

## Three ways to start

- **The mic button** in the title bar. Click to start, click again to stop.
- **The chord**, <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> on every
  platform — the one shortcut that does not move to <kbd>⌘</kbd> on macOS,
  because <kbd>⌘</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> is Finder's search. It
  needs a terminal focused, since what it does is type into a shell; with an
  editor or browser pane in front it says so.
- **Hold to talk**, off by default. Turn it on under **Settings → Voice** and
  holding the space bar in a terminal for a moment starts dictating; let go and
  it transcribes — the gesture Claude Code's own dictation uses, here for every
  program. A tap still types a space, and a key pressed mid-hold flushes the
  space ahead of it, so typing is unchanged.

Stopping — a second click, the chord again, or letting go of the held key —
sends the recording to the model. A recording under half a second is dropped
rather than transcribed.

## The key you hold

Space is the default because it is the key Claude Code uses, and that is also
its cost: while Hold to talk is on, holding the space bar inside Claude Code
starts TermHQ's dictation instead of Claude Code's. If you want both, give
TermHQ's a key of its own. **Settings → Voice → Hold key** shows the current
key; click it and press the one you want — any single key, a modifier such as
Right Ctrl included, which is the classic push-to-talk key. <kbd>Esc</kbd>
keeps the current one. A quick tap of the key still does what it normally does:
a character key types its character, a modifier or function key tapped alone
does nothing.

The hold is not a shortcut in the usual sense — it is a hold, not a chord — so
it lives in **Settings → Voice** rather than in **Settings → Shortcuts**.

## Where the words land

The transcript is typed into the terminal you started dictating in, not into
whichever pane happens to be focused when the model finishes. Start in one
pane, click into the next while it records or transcribes, and the words still
arrive in the first; only if that pane has been closed by then does the focused
terminal take them. Started from the mic button with an editor or browser pane
in front, dictation writes to whichever terminal is focused when the words
arrive.

Nothing is submitted for you. The words appear at the prompt as if typed, and
<kbd>Enter</kbd> is yours to press — read them first.

## The cursor shows it

While a recording is aimed at a pane, that pane's cursor becomes a block that
shows what is happening. Recording: a bar inside the cell rises with your
voice — gray in a quiet room, cycling through color the moment it hears you,
tuned so a quiet microphone still swings most of the cell. Transcribing: a
chrome block with the light traveling upward, in time with the mic button's
three dots and the *Transcribing…* label in the title bar. The block follows
the cursor as the shell moves it and disappears the moment the words land.

Reduced-motion settings still the animations and keep the block.

## Language and models

Dictation listens in English by default. **Settings → Voice → Dictation
language** offers sixteen more and an auto-detect option that lets a
multilingual model identify the language per recording; models labeled
*English only* stay English whatever this says. Models can be switched, deleted
or re-downloaded at any time, and they survive updates.

When something is wrong — no button, a flat waveform, the wrong words — see
[Troubleshooting](/docs/troubleshooting/#dictation-does-nothing).
