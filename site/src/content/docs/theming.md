---
title: "Theming"
weight: 90
description: "Built-in themes, writing your own, theming the workbench and editor, splitting the terminal palette, and importing themes from Open VSX."
---

TermHQ ships with ten built-in themes and will use any valid theme file you add.

Dark: **Default**, **Void**, **Pitch** (pure black, for OLED), **Graphite**,
**Abyss**, **Aurora**, **Ember**, **Moss**. Light: **Paper** (true white) and
**Dawn** (warm cream).

## Choosing one

**Settings → Appearance → Theme**. The list previews as you browse it: arrow or
hover through it and the app repaints behind the dropdown — chrome, terminal
palette, editor and all — with the option you started on badged `current`.
<kbd>Enter</kbd> or a click keeps that one; <kbd>Esc</kbd> or a click elsewhere
puts back where you were. Nothing is written to disk until you keep something, so
looking at thirty themes costs zero saves.

## The terminal palette can differ from the interface

A theme has two halves, and they can be driven by different themes.

**Settings → Appearance → Terminal theme** picks any theme as the source of the
terminal palette while the chrome stays on another — Graphite chrome hosting a
Dracula terminal is a preference, not a fork. Leave it empty and the terminal
follows the app theme.

For hand-made and built-in themes, that terminal palette also supplies the
editor's syntax colors. Choosing a separate terminal theme therefore gives the
terminals and editor the same visual language while leaving the surrounding
workbench alone.

Worth knowing if you author a theme whose two halves only look right together:
your `terminal` block may end up in use under somebody else's `ui` block.

## Writing your own

Themes are JSON files in the `themes/` directory inside your configuration
folder ([Configuration](/docs/configuration/)). Drop one in, reopen Settings, and
pick it. **Settings → Appearance → Folders → Themes folder** opens that directory.

A theme has a name and those two sections:

```json
{
  "name": "My Theme",
  "ui": {
    "bg": "#09090b",
    "panel": "#0b0b0e",
    "hairline": "rgba(255,255,255,0.08)",
    "hairlineStrong": "rgba(255,255,255,0.14)",
    "ink": "#fafafa",
    "muted": "#8a8a93",
    "faint": "#5a5a63",
    "accent": "#7c8cf8",
    "rec": "#ff5c5c",
    "attn": "#e8b34c",
    "selection": "#7c8cf84d"
  },
  "terminal": {
    "background": "#0b0b0e",
    "foreground": "#d6d6dc",
    "cursor": "#7c8cf8",
    "selectionBackground": "#3a3f6e80",
    "black": "#1a1a1f", "red": "#ff6b6b",
    "green": "#6bd68a", "yellow": "#e8c56b",
    "blue": "#7c8cf8", "magenta": "#c98bf0",
    "cyan": "#6bd6d6", "white": "#d6d6dc",
    "brightBlack": "#5a5a63", "brightRed": "#ff8a8a",
    "brightGreen": "#8ae5a5", "brightYellow": "#f2d98a",
    "brightBlue": "#9aa6fa", "brightMagenta": "#dba6f5",
    "brightCyan": "#8ae5e5", "brightWhite": "#fafafa"
  }
}
```

- **`ui`** colors the application around the terminals. The base colors above
  are enough for a complete theme: TermHQ derives every surface you leave out.
  A theme can optionally take individual control of the title bar, status bar,
  sidebar, pane headers, popups, menus, inputs, buttons, selections, focus rings,
  links, warnings, success states, and Git file colors. The commented template
  names every option.
- **`terminal`** colors the terminals themselves: the sixteen ANSI colors plus
  background, foreground, cursor and selection.

A few things you do not have to theme:

- **Workbench surfaces** are derived from the base colors until you override
  them. A small theme still paints the whole application, including light
  themes, without needing dozens of entries.
- **`ui.selection`** colors selected text in the chrome — inputs, file names,
  settings copy. Omit it and it falls back to `accent` at 30%. The terminal's own
  selection is the separate `terminal.selectionBackground`, because the terminal
  draws that one itself.
- **`ui.attn`** is the attention color for agent-idle badges and toasts. Omit it
  and attention surfaces follow `accent`. A color chosen in **Settings → Agents →
  Notification color** overrides it, so a theme cannot count on winning that one.
- **`terminal.background`** also paints the padding ring between the rows and the
  pane frame, so a theme whose terminal differs from `panel` still reads as one
  surface rather than a black frame.

`accent` marks the active parts of the interface. When a theme supplies more
specific colors, focus rings, buttons, selected rows, links, and Git states use
those instead of forcing the accent into every role. `panel` should sit slightly
above `bg` in lightness; the hairlines are the borders everywhere.

### The template is the contract

TermHQ writes `_template.jsonc` into your themes folder and keeps it current on
every launch. It is a fully commented copy of every themeable key, so "Themes
folder" always lands you next to working documentation.

It never loads as a theme itself: the loader skips `.jsonc` files and anything
whose name starts with `_`. That prefix is also how you park a theme you do not
want listed.

Themes you add yourself can be deleted from Settings. Built-in themes are
compiled into the app and have no file to remove.

## The editor follows the theme

Editor panes, diff views, and rendered Markdown now change with the active
theme — background, gutter, cursor, selections, widgets, diffs, and syntax. A
light workbench gets a light editor rather than dark syntax on a pale surface.

Built-in and hand-made themes derive syntax from the active terminal palette,
so the editor and the terminals beside it feel like one environment. Themes
imported from Open VSX keep the extension's own editor colors and syntax rules.

If you are authoring a theme and want exact control, `_template.jsonc` includes
an optional `editor` section. Most themes do not need it.

## Importing VS Code themes

**Settings → Appearance → Manage themes** opens a browser for
[Open VSX](https://open-vsx.org/), a vendor-neutral extension registry:
a most-downloaded shelf by default, live search, infinite scroll, and an
**Installed** view of everything you already have. Anything installed offers
**Apply** rather than a second install, and reads "Applied ✓" when it is the
active one.

TermHQ converts a VS Code color theme into its own format: the terminal palette,
the colors for the full workbench, and the extension's editor colors and syntax
rules. The result is written into your themes folder and marked with where it
came from.

Conversion fills in what real-world themes leave out, so secondary text remains
readable, panes stay distinct, buttons keep enough contrast, and focus never
disappears into the background. Comments in the source and themes that inherit
from another file inside the same extension are both handled.

An imported file keeps enough of its source colors to benefit when TermHQ's
converter improves. The next time themes are listed, an older import is refreshed
automatically. Imports from before that source was retained show **Re-import** in
the Installed view. If you deliberately hand-edit an imported theme and want to
freeze it, the template explains which saved source block to remove.

> **Open VSX only.** TermHQ does not use the Visual Studio Marketplace, whose
> terms of use restrict it to Microsoft products. Open VSX exists precisely so
> non-Microsoft tools have a legitimate source. Every download is one you chose;
> TermHQ redistributes nothing.

## File icons

File icon themes use the VS Code icon-theme format and install the same way, from
**Settings → Appearance → Manage icon packs** — Material, Catppuccin and
vscode-icons among them. **Settings → Appearance → File icons** picks the active
one, and it previews as you browse just like the theme list does.

Manual installs work too: drop a VS Code-format icon theme folder into the
`icons/` directory and reopen Settings. SVG only. Icon themes affect the file
panel, not the terminals.
