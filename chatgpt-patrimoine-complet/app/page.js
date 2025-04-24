"use client";
import { useState } from "react";
import ChatInterface from "./ChatInterface";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <main className="flex grow flex-col items-center justify-center px-6 py-12 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Mon Gestionnaire de Patrimoine</h1>
        <p className="max-w-2xl text-white text-xl mb-8 text-center drop-shadow-lg">
          Optimiser la gestion de tes finances personnelles, préparer l’avenir et maximiser ton patrimoine.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Commencer le chat
        </button>
      </main>
    );
  }

  return <ChatInterface />;
}