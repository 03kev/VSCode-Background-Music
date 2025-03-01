const vscode = require('vscode');
const path = require('path');
const player = require('play-sound')();

let currentPlayerProcess = null; // Tracks the spawned audio process

/**
 * Called once VS Code finishes activating (after onStartupFinished).
 */
function activate(context) {
  console.log('USSR BG Play extension activated!');

  // Optional: Automatically start playing on startup.
  playUssrTheme(context);

  // Register a single command to toggle audio playback
  const toggleCmd = vscode.commands.registerCommand('ussr-bg-play.toggleAudio', () => {
    toggleAudio(context);
  });

  // Clean up on extension deactivation
  context.subscriptions.push(toggleCmd);
}

/**
 * Called when the extension is deactivated (VS Code shutdown or extension unload).
 */
function deactivate() {
  stopUssrTheme();
}

/**
 * Plays the MP3 from the 'media' folder using 'play-sound'.
 */
function playUssrTheme(context) {
  const mp3FilePath = vscode.Uri.joinPath(context.extensionUri, 'media', 'theme.mp3').fsPath;

  // Use 'play-sound' to play in the background
  currentPlayerProcess = player.play(mp3FilePath, (err) => {
    if (err) {
      console.error('Error playing MP3:', err);
    } else {
      console.log('Playing USSR theme in the background...');
    }
  });
}

/**
 * Stops playback by killing the spawned process.
 */
function stopUssrTheme() {
  if (currentPlayerProcess) {
    currentPlayerProcess.kill(); 
    currentPlayerProcess = null;
    console.log('Audio stopped.');
  }
}

/**
 * Toggles playback:
 * - If audio is currently playing, stop it.
 * - If audio is currently stopped, replay it.
 */
function toggleAudio(context) {
  if (currentPlayerProcess) {
    stopUssrTheme();
  } else {
    playUssrTheme(context);
  }
}

module.exports = {
  activate,
  deactivate
};