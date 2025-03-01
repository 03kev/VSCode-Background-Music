# USSR BG Play (Toggle Edition)

This extension **automatically plays** a bundled MP3 in the background when VS Code starts (if configured). It provides:
- A **volume** setting, allowing you to choose **0–100**.  
- A **boolean** setting to **enable/disable** audio at startup.  
- A **single** toggle command to **stop** or **replay** the audio. By default, on macOS, press **Ctrl+Command+Shift+Option+P** to toggle on/off.

---

## How It Works

1. **On Startup** (Optional):  
   - The extension is activated via `onStartupFinished`.  
   - If the `ussr-bg-play.playOnStartup` setting is `true`, it calls `playUssrTheme()` and begins playing audio.  
   - If `false`, audio won’t start automatically, but you can still toggle it manually.

2. **Volume Setting** (`ussr-bg-play.volume`):  
   - In the extension’s settings, you can set a numeric value **0–100**.  
   - On macOS, this is converted to `0.0–1.0` for `afplay`.  
   - On Linux or Windows (if using `mplayer`), it’s used directly as `-volume 0–100`.  
   - Defaults to `50`.

3. **Toggle Command**:  
   - A single command, `ussr-bg-play.toggleAudio`, checks if the audio is playing.  
   - If **playing**, it **stops** (kills the background process).  
   - If **stopped**, it **starts** the MP3 again at your chosen volume.

4. **Keybinding**:  
   - In `package.json`, the `keybindings` section assigns **Ctrl+Command+Shift+Option+P** (macOS) to the toggle command.  
   - You can edit this in the extension’s `package.json` or via VS Code’s **Preferences → Keyboard Shortcuts**.

---

## Configuration

This extension adds two settings to the VS Code **Settings** (`File → Preferences → Settings` or `Cmd+,` on macOS):

```jsonc
{
  "ussr-bg-play.playOnStartup": true, // true or false
  "ussr-bg-play.volume": 50          // 0 to 100
}
```

   - ussr-bg-play.playOnStartup (boolean): If true, the audio plays automatically when VS Code loads.
   - ussr-bg-play.volume (number): A number 0–100 used to set the audio volume. The default is 50.

## Installation

1.	**Dependencies**:
   - The extension uses the play-sound library to play audio in the background.
   - Make sure it’s under dependencies in your package.json and run npm install.

2.	**Build & Run**:
   - Open the extension folder in VS Code, then invoke “Debug: Start Debugging” from the Command Palette or use the Run and Debug panel.
   - If ussr-bg-play.playOnStartup is true, you should hear the MP3 playing automatically.
   - Toggle it with Ctrl+Command+Shift+Option+P (on macOS, or your chosen hotkey).
3.	**Package & Install (Optional)**:

   - Install vsce: npm install -g vsce
   - Run vsce package to produce a .vsix file.
   - Install the .vsix in your main VS Code using “Extensions: Install from VSIX…”.

## Folder Structure

```plaintext
ussr-bg-play/
├─ media/
│   └─ ussr.mp3          (Your MP3 file)
├─ package.json          (Extension metadata, contributes config, etc.)
├─ extension.js          (Main logic: activate(), toggle, volume, etc.)
└─ node_modules/
```

## Customization

1. **Change the MP3**:  
   - Replace `ussr.mp3` in `media/` with any MP3 you’d like.  
   - Update references in `extension.js` if you rename it.

2. **Change Keybinding**:  
   - Edit `package.json` → `contributes.keybindings` to use your own key combination,  
     or configure in VS Code’s Preferences → Keyboard Shortcuts.

3. **Disable Auto-Play**:  
   - In Settings, set `ussr-bg-play.playOnStartup` to `false` if you don’t want audio at startup.

4. **Adjust Volume**:  
   - In Settings, use `ussr-bg-play.volume` (0–100).  
   - On macOS, that converts to `afplay -v 0.0–1.0`; on Linux/Windows (with mplayer), `-volume 0–100`.

**Enjoy your toggleable background audio in VS Code—with volume controls and a startup toggle!**