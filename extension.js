const vscode = require('vscode');
const path = require('path');
const player = require('play-sound')();

const os = require('os');
const platform = os.platform();

let currentPlayerProcess = null; // Tracks the spawned audio process

/**
* Called once VS Code finishes activating (after onStartupFinished).
*/
function activate(context) {
    console.log('USSR BG Play extension activated!');
    
    // Read the user setting
    const config = vscode.workspace.getConfiguration('ussr-bg-play');
    const shouldPlayOnStartup = config.get('playOnStartup');
    
    // Only play if user wants it
    if (shouldPlayOnStartup) {
        playUssrTheme(context);
    }
    
    // Register a single command to toggle audio playback
    const toggleCmd = vscode.commands.registerCommand('ussr-bg-play.toggleAudio', () => {
        toggleAudio(context);
    });
    
    context.subscriptions.push(toggleCmd);
    
    // Optional: If you want to watch for changes to the setting in real time:
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('ussr-bg-play.playOnStartup')) {
            const updatedShouldPlayOnStartup = config.get('playOnStartup');
            console.log('playOnStartup changed to:', updatedShouldPlayOnStartup);
            // Decide if you want to do something immediately if the user toggles it mid-session
            // For example, you might automatically start or stop the theme
        }
    }, null, context.subscriptions);
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

    // Get user’s chosen volume (0–100)
    const config = vscode.workspace.getConfiguration('ussr-bg-play');
    const userVolume = config.get('volume'); // e.g. 50

    // Convert "0–100" into platform-specific values
    let options = {};
    if (platform === 'darwin') {
        // macOS (afplay) volume is 0.0 to 1.0
        const afplayVolume = (userVolume / 100).toFixed(2); // e.g., "0.50" for 50
        options = { afplay: ['-v', afplayVolume] };
    } else if (platform === 'linux') {
        // Linux (mplayer) volume is 0–100
        const mplayerVolume = userVolume.toString(); // "50"
        options = { mplayer: ['-volume', mplayerVolume] };
    } else if (platform === 'win32') {
        // Windows also can use mplayer if installed
        const mplayerVolume = userVolume.toString();
        options = { mplayer: ['-volume', mplayerVolume] };
    }

    // Start the player process
    currentPlayerProcess = player.play(mp3FilePath, options, (err) => {
        if (err) {
            console.error('Error playing MP3:', err);
        } else {
            console.log(`Playing USSR theme at volume ${userVolume} on ${platform}...`);
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