"use client";
import { useState } from "react";
import ChatInterface from "./ChatInterface";

export default function Home() {
  const [started, setStarted] = useState(false);

  const heroStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundImage: "url('/hero-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  const titleStyle = { fontSize: '3rem', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '1rem' };
  const textStyle = { maxWidth: '600px', color: '#ffffff', fontSize: '1.25rem', textAlign: 'center', marginBottom: '2rem', textShadow: '0 1px 3px rgba(0,0,0,0.5)' };
  const buttonStyle = { padding: '1rem 2rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '9999px', fontSize: '1rem', cursor: 'pointer' };

  if (!started) {
    return (
      <main style={heroStyle}>
        <h1 style={titleStyle}>Mon Gestionnaire de Patrimoine</h1>
        <p style={textStyle}>Optimiser la gestion de tes finances personnelles, préparer l’avenir et maximiser ton patrimoine.</p>
        <button style={buttonStyle} onClick={() => setStarted(true)}>Commencer le chat</button>
      </main>
    );
  }

  return <ChatInterface />;
}