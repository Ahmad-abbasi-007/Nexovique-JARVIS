import { useState, useEffect, useRef, useCallback } from 'react'
import { FiMic, FiMicOff, FiSend, FiArrowLeft, FiGlobe, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './JarvisUI.css'

const startRecognition = (recognition) => {
  try {
    recognition.start()
  } catch (error) {
    console.error('Speech recognition could not start:', error)
  }
}

export default function JarvisUI() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [wakeWordActive, setWakeWordActive] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  
  const chatEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  // 🔥 Load Chat History from Database
  useEffect(() => {
    fetch('http://localhost:5000/api/history')
      .then(res => res.json())
      .then(data => {
        if (data.history && data.history.length > 0) {
          setMessages(data.history.map(c => ({ text: c.text, sender: c.sender })))
        } else {
          setMessages([{ text: "Hello Sir. JARVIS is online. How may I assist you today?", sender: "jarvis" }])
        }
      })
      .catch(() => {
        setMessages([{ text: "Hello Sir. JARVIS is online. How may I assist you today?", sender: "jarvis" }])
      })
  }, [])

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // 🔥 Text-to-Speech
  const speak = useCallback((text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    const synth = synthRef.current
    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedLanguage === 'ur-PK') utterance.lang = 'ur-PK'
    else if (selectedLanguage === 'hi-IN') utterance.lang = 'hi-IN'
    else utterance.lang = 'en-US'

    const loadAndSpeak = () => {
      const voices = synth.getVoices()
      let voice = voices.find(v => v.lang === utterance.lang) || voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]))
      if (voice) utterance.voice = voice
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      synth.speak(utterance)
    }

    if (synth.getVoices().length > 0) loadAndSpeak()
    else synth.onvoiceschanged = loadAndSpeak
  }, [selectedLanguage, voiceEnabled])

  // 🔥 Send Message
  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return
    setMessages(prev => [...prev, { text, sender: "user" }])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, sender: "jarvis" }])
        speak(data.reply)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [...prev, { text: "Sorry Sir, connect nahi ho pa raha.", sender: "jarvis" }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, speak])

  const speakRef = useRef(speak)
  const sendMessageRef = useRef(handleSendMessage)
  useEffect(() => {
    speakRef.current = speak
    sendMessageRef.current = handleSendMessage
  }, [speak, handleSendMessage])

  // 🔥 Clear Chat History
  const clearChat = async () => {
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      try {
        const response = await fetch('http://localhost:5000/api/history', { method: 'DELETE' })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setMessages([{ text: "Hello Sir. JARVIS is online. How may I assist you today?", sender: "jarvis" }])
      } catch (error) {
        console.error('Failed to clear chat history:', error)
        setMessages(prev => [...prev, { text: "Sorry Sir, chat history could not be cleared.", sender: "jarvis" }])
      }
    }
  }

  // 🔥 Wake Word
  useEffect(() => {
    if (!wakeWordActive) {
      if (recognitionRef.current) recognitionRef.current.stop()
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = selectedLanguage

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
      if (transcript.includes('hey jarvis') || transcript.includes('jarvis')) {
        const command = transcript.replace('hey jarvis', '').replace('jarvis', '').trim()
        if (command.length > 2) sendMessageRef.current(command)
        else speakRef.current("Yes Sir, I am listening.")
      }
    }
    recognition.onerror = (e) => { if (e.error === 'not-allowed') setWakeWordActive(false) }
    let shouldRestart = true
    recognition.onend = () => { if (shouldRestart && wakeWordActive) startRecognition(recognition) }
    startRecognition(recognition)
    recognitionRef.current = recognition

    return () => {
      shouldRestart = false
      if (recognitionRef.current) recognitionRef.current.stop()
    }
  }, [wakeWordActive, selectedLanguage])

  // 🔥 Manual Mic
  const startManualListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) { alert("Use Chrome browser"); return }

    const recognition = new SpeechRecognition()
    recognition.lang = selectedLanguage
    recognition.interimResults = false
    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event) => handleSendMessage(event.results[0][0].transcript)
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  return (
    <div className="jarvis-container">
      <header className="jarvis-header">
        <Link to="/" className="back-btn"><FiArrowLeft /> Back</Link>
        <div className="jarvis-brand"><span className="status-dot"></span> J.A.R.V.I.S</div>
        <div className="header-controls">
          <button className={`icon-btn ${voiceEnabled ? 'active' : ''}`} onClick={() => setVoiceEnabled(!voiceEnabled)} title="Voice">
            {voiceEnabled ? '🔊' : '🔇'}
          </button>
          <button className={`icon-btn ${wakeWordActive ? 'active' : ''}`} onClick={() => setWakeWordActive(!wakeWordActive)} title="Wake Word">
            🎧
          </button>
          <button className="icon-btn" onClick={clearChat} title="Clear Chat"><FiTrash2 /></button>
        </div>
      </header>

      <div className="lang-bar">
        <FiGlobe />
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="ur-PK">اردو (Urdu)</option>
          <option value="hi-IN">हिन्दी (Hindi)</option>
        </select>
      </div>

      <div className="visualizer-area">
        <div className={`ai-orb ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}>
          <div className="orb-core"></div>
          <div className="orb-ring ring-1"></div>
          <div className="orb-ring ring-2"></div>
          <div className="orb-ring ring-3"></div>
        </div>
        <p className="status-text">
          {isListening ? "Listening..." : isSpeaking ? "Speaking..." : isLoading ? "Processing..." : 
            wakeWordActive ? '🎧 Say "Hey Jarvis"...' : 'Tap mic and ask me anything'}
        </p>
      </div>

      <div className="chat-area">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.sender === 'jarvis' && <span className="avatar">J</span>}
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message jarvis">
              <span className="avatar">J</span>
              <div className="message-bubble loading-dots"><span>.</span><span>.</span><span>.</span></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="input-area" onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText) }}>
          <button type="button" className={`mic-btn ${isListening ? 'active' : ''}`} onClick={startManualListening} disabled={isLoading}>
            {isListening ? <FiMicOff /> : <FiMic />}
          </button>
          <input type="text" placeholder="Type or say 'Hey Jarvis'..." value={inputText} onChange={(e) => setInputText(e.target.value)} disabled={isLoading} />
          <button type="submit" className="send-btn" disabled={!inputText.trim() || isLoading}><FiSend /></button>
        </form>
      </div>
    </div>
  )
}