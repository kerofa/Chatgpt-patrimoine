"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([{ role: "bot", text: "Salut ! Pose-moi ta question patrimoniale." }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const { response } = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Désolé, une erreur côté IA." }]);
    }
  };

  const wrapperStyle = { display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' };
  const messagesStyle = { flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#f7f7f8', display: 'flex', flexDirection: 'column', gap: '0.75rem' };
  const userBubble = { alignSelf: 'flex-end', backgroundColor: '#0070f3', color: '#fff', padding: '0.75rem', borderRadius: '16px', maxWidth: '80%' };
  const botBubble = { alignSelf: 'flex-start', backgroundColor: '#e5e5ea', color: '#000', padding: '0.75rem', borderRadius: '16px', maxWidth: '80%' };
  const inputContainer = { display: 'flex', padding: '1rem', borderTop: '1px solid #ddd', backgroundColor: '#fff' };
  const inputStyle = { flex: 1, padding: '0.75rem', borderRadius: '9999px', border: '1px solid #ccc', marginRight: '0.5rem' };
  const buttonStyleChat = { padding: '0.75rem 1.5rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '9999px', cursor: 'pointer' };

  return (
    <div style={wrapperStyle}>
      <div style={messagesStyle}>
        {messages.map((m, i) => (
          <div key={i} style={m.role === "bot" ? botBubble : userBubble}>
            {m.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div style={inputContainer}>
        <input
          style={inputStyle}
          placeholder="Écris ta question…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button style={buttonStyleChat} onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}