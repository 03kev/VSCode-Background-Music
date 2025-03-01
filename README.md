# USSR BG Play (Toggle Edition)

This extension **automatically plays** a bundled MP3 in the background when VS Code starts. It also provides **one** toggle command to **stop** or **replay** the audio. By default, on macOS, you can press **Ctrl+Command+Shift+Option+P** to toggle the audio on/off.

## How It Works

1. **On Startup**:  
   - The extension is activated via `onStartupFinished`, then immediately calls `playUssrTheme()` to start the audio.

2. **Toggle Command**:  
   - A single command, `ussr-bg-play.toggleAudio`, checks if the audio is playing.  
   - If **playing**, it **stops** (kills the background process).  
   - If **stopped**, it **replays** the MP3.

3. **Keybinding**:  
   - In `package.json`, the `keybindings` section assigns **Ctrl+Command+Shift+Option+P** (macOS) to the toggle command.  
   - You can easily change this in the extension’s `package.json` or via VS Code **Preferences → Keyboard Shortcuts**.

## Installation

1. **Dependencies**:  
   - The extension uses the [`play-sound`](https://www.npmjs.com/package/play-sound) library to play audio in the background. Make sure it’s listed as a dependency in your `package.json` and installed via `npm install`.

2. **Build & Run**:  
   - Open the extension folder in VS Code, then press **F5** to launch a test environment (Extension Development Host). You should hear the MP3 playing.

3. **Package & Install (Optional)**:  
   - Install **vsce**: `npm install -g vsce`  
   - Run `vsce package` to produce a `.vsix` file.  
   - Install the `.vsix` in your main VS Code using “Extensions: Install from VSIX...”.

## Folder Structure

ussr-bg-play/
├─ media/
│   └─ ussr.mp3      (Your MP3 file)
├─ package.json
├─ extension.js      (Contains activate(), toggle logic, etc.)
└─ node_modules/

## Customization

- **Change the MP3**:  
  - Replace `ussr.mp3` in `media/` with any MP3 you’d like.  
  - Update references in `extension.js` if you rename it.  
- **Change Keybinding**:  
  - Edit `package.json` → `contributes.keybindings` to use your preferred key combination.  
- **Disable Auto-Play**:  
  - Remove or comment out the `playUssrTheme(context);` call in `activate()` if you don’t want it playing at startup.  

---

**Enjoy your toggleable background audio in VS Code!**