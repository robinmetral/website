---
title: "TIL: automatic theme switching in VSCode"
categories:
  - name: dev
publishDate: "2023-03-26"
template: page
buildScript: "/scripts/processNote.js"
highlightCode: true
---

Dropping this in here for future reference, because there are outdated posts about this online and I keep forgetting how to set this up.

So for a long time, VSCode did not have automatic theme switching[^1]. To change from a light to a dark theme, you had to open the command palette and change "Preferences: Color Theme" (under the hood, this would set the `workbench.colorTheme` setting to the selected theme). Extensions were built to solve this, and that's why [posts](https://burkeholland.dev/posts/vscode/auto-switch-themes/) are still recommending some of these.

No need for extensions anymore! Since [VSCode v1.42 (January 2020)](https://code.visualstudio.com/updates/v1_42#_auto-switch-theme-based-on-os-color-scheme), VSCode will automatically switch between themes based on the OS color scheme.

In VSCode settings (JSON), **remove** this line:

```json
"workbench.colorTheme": "Default Light+ Experimental",
```

...and **add** these lines:

```json
"window.autoDetectColorScheme": true, // This handles automatic theme switching
"workbench.preferredLightColorTheme": "Default Light+ Experimental", // ...or any other light theme
"workbench.preferredDarkColorTheme": "Default Dark+ Experimental", // ...or any other dark theme
```

Done!

[^1]: automatic as in based on the OS color scheme. For example in newer macOS versions, you can conveniently toggle between light and dark at the OS level using the Display menu in the menu bar.
