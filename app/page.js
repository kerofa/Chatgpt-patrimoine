"use client";
import { useState } from "react";
import ChatInterface from "./ChatInterface";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <h1 className="text-5xl font-extrabold mb-4">Mon Gestionnaire de Patrimoine</h1>
        <p className="max-w-2xl text-gray-700 text-lg mb-8 text-center">
          Optimiser la gestion de tes finances personnelles, préparer l’avenir et
          maximiser ton patrimoine. Épargne, investissements, fiscalité et
          planification retraite, avec un accompagnement direct et humain.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Commencer le chat
        </button>
      </main>
    );
  }

  return <ChatInterface />;
}