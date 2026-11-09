// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { GoogleGenAI } = require('@google/genai');
const { exec } = require('child_process');
const path = require('path');

dotenv.config({ path: process.env.JARVIS_ENV_PATH || path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// 🔥 Chat Schema
const chatSchema = new mongoose.Schema({
  userId: { type: String, default: 'default_user' },
  sender: String, // 'user' or 'jarvis'
  text: String,
  timestamp: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);

// API Key yahan direct daali hai taake .exe me kaam kare
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🔥 System Action (Apps/Websites)
const handleSystemAction = (appName) => {
  const action = {
    chrome: { command: 'start chrome', displayName: 'Google Chrome' },
    whatsapp: { command: 'start "" "whatsapp://"', displayName: 'WhatsApp' },
    notepad: { command: 'notepad', displayName: 'Notepad' },
    calculator: { command: 'calc', displayName: 'Calculator' },
    settings: { command: 'start ms-settings:', displayName: 'Settings' },
    youtube: { command: 'start https://www.youtube.com', displayName: 'YouTube' },
    google: { command: 'start https://www.google.com', displayName: 'Google' },
    chatgpt: { command: 'start https://chat.openai.com', displayName: 'ChatGPT' },
    gemini: { command: 'start https://gemini.google.com', displayName: 'Gemini' },
    facebook: { command: 'start https://www.facebook.com', displayName: 'Facebook' },
    instagram: { command: 'start https://www.instagram.com', displayName: 'Instagram' },
    github: { command: 'start https://www.github.com', displayName: 'GitHub' },
    tiktok: { command: 'start https://www.tiktok.com', displayName: 'TikTok' },
  }[appName.toLowerCase()];

  if (!action) return null;

  exec(action.command, (error) => {
    if (error) console.log(`❌ Failed: ${action.displayName}`);
    else console.log(`✅ Opened: ${action.displayName}`);
  });
  return action.displayName;
};

// 🔥 System Control (Volume, Screenshot, Lock, Shutdown)
const handleSystemControl = (action) => {
  try {
    switch (action) {
      case 'volume_up':
        for(let i=0; i<5; i++) exec(`powershell -c "(New-Object -ComObject WScript.Shell).SendKeys([char]175)"`);
        return "Volume increased, Sir.";
      case 'volume_down':
        for(let i=0; i<5; i++) exec(`powershell -c "(New-Object -ComObject WScript.Shell).SendKeys([char]174)"`);
        return "Volume decreased, Sir.";
      case 'mute':
        exec(`powershell -c "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"`);
        return "Muted, Sir.";
      case 'screenshot': {
        const desktopPath = path.join(process.env.USERPROFILE, 'Desktop');
        const screenshotPath = path.join(desktopPath, `JARVIS_Screenshot_${Date.now()}.png`);
        const ps = `Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; $bitmap = New-Object System.Drawing.Bitmap $screen.Width, $screen.Height; $graphics = [System.Drawing.Graphics]::FromImage($bitmap); $graphics.CopyFromScreen($screen.Location, [System.Drawing.Point]::Empty, $screen.Size); $bitmap.Save("${screenshotPath.replace(/\\/g, '\\\\')}")`;
        exec(`powershell -c "${ps}"`);
        return "Screenshot saved to Desktop, Sir.";
      }
      case 'lock':
        exec('rundll32.exe user32.dll,LockWorkStation');
        return "Locking PC, Sir.";
      case 'shutdown':
        exec('shutdown /s /t 10');
        return "Shutting down in 10 seconds, Sir.";
      case 'restart':
        exec('shutdown /r /t 10');
        return "Restarting in 10 seconds, Sir.";
      default: return null;
    }
  } catch (error) {
    console.error('Failed to execute system control:', error);
    return null;
  }
};

// 🔥 Chat History API
app.get('/api/history', async (req, res) => {
  try {
    const chats = await Chat.find({ userId: 'default_user' }).sort({ timestamp: 1 }).limit(50);
    res.json({ history: chats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/history', async (req, res) => {
  try {
    await Chat.deleteMany({ userId: 'default_user' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Main Chat API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A non-empty message is required.' });
    }
    const lowerMessage = message.toLowerCase();

    // 1. SYSTEM CONTROL
    let systemAction = null;
    if (lowerMessage.includes('volume up') || lowerMessage.includes('awaz barhao')) systemAction = 'volume_up';
    else if (lowerMessage.includes('volume down') || lowerMessage.includes('awaz kam')) systemAction = 'volume_down';
    else if (lowerMessage.includes('mute')) systemAction = 'mute';
    else if (lowerMessage.includes('screenshot')) systemAction = 'screenshot';
    else if (lowerMessage.includes('lock')) systemAction = 'lock';
    else if (lowerMessage.includes('shutdown')) systemAction = 'shutdown';
    else if (lowerMessage.includes('restart')) systemAction = 'restart';

    if (systemAction) {
      const replyText = handleSystemControl(systemAction);
      if (replyText) {
        await Chat.create({ sender: 'user', text: message });
        await Chat.create({ sender: 'jarvis', text: replyText });
        return res.json({ reply: replyText });
      }
    }

    // 2. WEB SEARCH
    if ((lowerMessage.includes('search') || lowerMessage.includes('google') || lowerMessage.includes('dhundo')) && lowerMessage.length > 10) {
      let query = message.replace(/search|google|dhundo|par|on|for|karo/gi, '').trim();
      if (query.length > 2) {
        exec(`start https://www.google.com/search?q=${encodeURIComponent(query)}`);
        const replyText = `Searching Google for "${query}", Sir.`;
        await Chat.create({ sender: 'user', text: message });
        await Chat.create({ sender: 'jarvis', text: replyText });
        return res.json({ reply: replyText });
      }
    }

    // 3. APP OPEN
    let appToOpen = null;
    if (lowerMessage.includes('open') || lowerMessage.includes('kholo') || lowerMessage.includes('launch')) {
      const apps = ['chrome', 'whatsapp', 'notepad', 'calculator', 'youtube', 'google', 'chatgpt', 'gemini', 'facebook', 'instagram', 'github', 'tiktok', 'settings'];
      for (const app of apps) {
        if (lowerMessage.includes(app)) { appToOpen = app; break; }
      }
    }
    if (appToOpen) {
      const openedApp = handleSystemAction(appToOpen);
      if (openedApp) {
        const replyText = `Right away, Sir. Opening ${openedApp} for you.`;
        await Chat.create({ sender: 'user', text: message });
        await Chat.create({ sender: 'jarvis', text: replyText });
        return res.json({ reply: replyText });
      }
    }

    // 4. AI REPLY (MongoDB se history)
    const pastChats = await Chat.find({ userId: 'default_user' }).sort({ timestamp: 1 }).limit(10);
    let chatContext = "";
    if (pastChats.length > 0) {
      chatContext = "Previous conversation:\n";
      pastChats.forEach(c => {
        chatContext += `${c.sender === 'user' ? 'User' : 'JARVIS'}: ${c.text}\n`;
      });
    }

    // Delay lagaya hai taake free tier limit cross na ho
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `${chatContext}
You are JARVIS, an advanced AI personal assistant created by Nexovique Technologies. 
Keep answers concise. Understand English, Urdu, Roman Urdu, Hindi.
User's message: ${message}`,
    });

    const replyText = response.text;
    
    // Save to DB
    await Chat.create({ sender: 'user', text: message });
    await Chat.create({ sender: 'jarvis', text: replyText });

    res.json({ reply: replyText });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI se connect nahi ho paya." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 JARVIS Backend running on http://localhost:${PORT}`);
});