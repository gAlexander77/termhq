---
title: "Dictation"
weight: 62
description: "Talk into a terminal or a text field: on-device transcription with a local Whisper model, started from a button, a chord, or a held key, with a cursor that shows it listening."
---

TermHQ types what you say into a terminal, or into one of its own text fields.
Transcription happens on your own machine, on a Whisper model you download
once — nothing is sent anywhere, which matters for a terminal sitting in front
of proprietary source. It exists because prompts to coding agents are long and
typing them is the slow part, but it works at any shell prompt.

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

Keep Settings open while a model downloads: closing it cancels the download.
Press <kbd>Esc</kbd>, click its close button or click outside it mid-download and
TermHQ asks first — **Keep downloading**, or **Close and cancel it**.

Linux support is pending.

## Three ways to start

- **The mic button** in the title bar. Click to start, click again to stop. The
  words go to the focused terminal, or to the text field you were typing in
  when you clicked.
- **The chord**, <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> on every
  platform — the one shortcut that does not move to <kbd>⌘</kbd> on macOS,
  because <kbd>⌘</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> is Finder's search. It
  works in a terminal and in TermHQ's own text fields.
- **Hold to talk**, off by default. Turn it on under **Settings → Voice** and
  holding the space bar in a terminal for a moment starts dictating; let go and
  it transcribes — the gesture Claude Code's own dictation uses, here for every
  program. A tap still types a space, and a key pressed mid-hold flushes the
  space ahead of it, so typing is unchanged.

Stopping — a second click, the chord again, or letting go of the held key —
sends the recording to the model. The button and the chord stop a recording even
if you have clicked into another terminal, an editor or a text field since. The
exceptions are a web page in a browser pane, which keeps the chord for itself,
and ultra focus, which hands it to the terminal — use the button there. A
recording under 0.4 seconds is dropped rather than transcribed.

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

In a terminal, the transcript is typed into the terminal you started dictating
in, not into whichever pane happens to be focused when the model finishes. Start
in one pane, click into the next while it records or transcribes, and the words
still arrive in the first. Dictate twice into the same prompt without typing in
between, and the second lands after a space so the two do not run together.

In a text field — the commit box, a search box, a browser pane's address bar —
the words go in at the cursor, replacing any selected text, with a space in
front where they would otherwise run into the word before. The field takes them
as if you had typed them.

Anywhere else there is nothing to type into: an editor, a web page, a terminal
whose shell has ended. There dictation does not start. The mic button says
**Nothing to dictate into** in the status bar, and the chord goes on to the pane
like any shortcut with nothing to do.

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

## When it fails

A dictation that cannot finish says why in the status bar, and the message's
tooltip says what to do:

| The status bar says | What to do |
|---|---|
| Dictation: The microphone is blocked | Allow microphone access for TermHQ in the system's privacy settings, then try again. |
| Dictation: No microphone was found | Plug one in, or pick another in **Settings → Voice**. |
| Dictation: The microphone is busy | Another app may be holding it — close that app, then try again. |
| Dictation: The microphone could not be opened | The tooltip carries the system's own reason. |
| Dictation: No speech model is installed | Download one in **Settings → Voice**. |
| Dictation: Nothing was heard | Speak a little longer, or check the level with **Settings → Voice → Test microphone**. |
| Dictation: Transcription failed | The tooltip carries Whisper's own error. |

Beside the mic button, *Dictation failed* shows for a moment at the same time.

## Language and models

Dictation listens in English by default. **Settings → Voice → Dictation
language** offers fifteen more and an auto-detect option that lets a
multilingual model identify the language per recording; models labeled
*English only* stay English whatever this says. Models can be switched, deleted
or re-downloaded at any time, and they survive updates.

When something is wrong — no button, a flat waveform, the wrong words — see
[Troubleshooting](/docs/troubleshooting/#dictation-does-nothing).
