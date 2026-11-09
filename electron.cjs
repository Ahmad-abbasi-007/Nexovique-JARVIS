// electron.cjs
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fork } = require('child_process'); // Backend chalane ke liye

let backendProcess;

function startBackend() {
  const serverPath = path.join(__dirname, 'server', 'index.js');
  backendProcess = fork(serverPath);

  backendProcess.on('error', (err) => {
    console.error('Backend error:', err);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  const isDev = !app.isPackaged;
  
  if (isDev) {
    // Development me direct JARVIS page load karo
    win.loadURL('http://localhost:5173/#/jarvis');
  } else {
    // Build me direct index.html + hash route load karo (taake blank screen na aaye)
    win.loadFile(path.join(__dirname, 'dist', 'index.html'), { hash: 'jarvis' });
  }
}

app.whenReady().then(() => {
  startBackend(); // Pehle backend start karo
  createWindow(); // Phir window kholo
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill(); // App band hone par backend bhi band ho
  if (process.platform !== 'darwin') {
    app.quit();
  }
});