---
title: "Theming"
weight: 90
description: "Built-in themes, writing your own, and importing VS Code colour themes from Open VSX."
---

TermHQ ships with several themes and will use any valid theme file you add.

## Choosing one

**Settings → Appearance → Theme**. Changes apply immediately, across every pane
and the interface itself — the terminal and the surrounding UI are driven by the
same palette, so they never disagree.

## Writing your own

Themes are JSON. Drop a file in the `themes/` directory inside your
configuration folder ([Configuration](/docs/configuration/)) and it appears in
the list. **Settings → Appearance → Open themes folder** takes you there.

A theme names the sixteen ANSI colours plus the interface's own values:

```json
{
  "name": "My Theme",
  "background": "#000000",
  "foreground": "#ffffff",
  "cursor": "#ffffff",
  "selection": "#333333",
  "black": "#000000",
  "red": "#ff5555",
  "green": "#50fa7b",
  "yellow": "#f1fa8c",
  "blue": "#6272a4",
  "magenta": "#ff79c6",
  "cyan": "#8be9fd",
  "white": "#bfbfbf",
  "brightBlack": "#4d4d4d",
  "brightRed": "#ff6e67",
  "brightGreen": "#5af78e",
  "brightYellow": "#f4f99d",
  "brightBlue": "#caa9fa",
  "brightMagenta": "#ff92d0",
  "brightCyan": "#9aedfe",
  "brightWhite": "#e6e6e6"
}
```

Values you leave out are derived from the ones you set, so a minimal theme with
a background, a foreground and an accent produces a coherent interface rather
than a half-styled one.

Themes you add yourself can be deleted from Settings. Built-in themes are
compiled into the app and have no file to remove.

## Importing VS Code themes

TermHQ can convert a VS Code colour theme into its own format.

**Settings → Appearance → Import theme** browses
[Open VSX](https://open-vsx.org/), a vendor-neutral extension registry. Pick a
theme and TermHQ downloads it, converts every theme the extension contributes,
and adds them to your list.

Imported themes are marked with where they came from, so the browser can show
what you already have.

> **Open VSX only.** TermHQ does not use the Visual Studio Marketplace, whose
> terms of use restrict it to Microsoft products. Open VSX exists precisely so
> non-Microsoft tools have a legitimate source. All downloads are things you
> chose; TermHQ redistributes nothing.

Conversion handles the awkward parts of real-world themes — comments in the JSON,
and themes that inherit from another file inside the same extension. Where a
theme does not define something TermHQ needs, the value is derived from what it
does define rather than dropped.

## File icons

File icon themes use the VS Code icon-theme format and install from `.vsix`
packages the same way, under **Settings → Appearance → Icon theme**. They affect
the file panel, not the terminals.
