"use client";
import { useState } from "react";

export default function Home() {
  // 0–4 = gating, ≥5 = chat
  const [stage, setStage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeCallback: null,
  });
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut ! Pour commencer, quel est ton prénom ?" },
  ]);
  const [input, setInput] = useState("");

  const gatingQuestions = [
    "Ton nom de famille ?",
    "Ton adresse e-mail ?",
    "Ton numéro de téléphone ?",
    "Accepterais-tu d’être rappelé pour parler de ton projet ? (oui/non)",
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;
    const answer = input.trim();
    // Log pour debug
    console.log("🔄 sendMessage, stage =", stage, "answer =", answer);

    // Ajoute la réponse utilisateur
    setMessages((m) => [...m, { role: "user", text: answer }]);
    setInput("");

    // Gating : recueillir infos
    if (stage < 5) {
      const updated = { ...userInfo };
      if (stage === 0) updated.firstName = answer;
      if (stage === 1) updated.lastName = answer;
      if (stage === 2) updated.email = answer;
      if (stage === 3) updated.phone = answer;
      if (stage === 4) updated.agreeCallback = answer.toLowerCase().startsWith("o");
      setUserInfo(updated);

      const nextStage = stage + 1;
      setStage(nextStage);

      // Si fin du gating et accord donné
      if (nextStage === 5 && updated.agreeCallback) {
        await fetch("/api/rdv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        setMessages((m) => [
          ...m,
          { role: "bot", text: "Merci ! Tes infos sont bien reçues, je te rappelle bientôt." },
        ]);
      } else if (nextStage === 5) {
        setMessages((m) => [
          ...m,
          { role: "bot", text: "Pas de souci, tu peux poser tes questions directement." },
        ]);
      }

      // Affiche la question suivante ou transition vers le chat
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            nextStage < 5
              ? gatingQuestions[nextStage - 1]
              : "Maintenant, pose-moi ta question sur ton patrimoine !",
        },
      ]);
      return;
    }

    // Mode chat IA
    try {
      console.log("📡 Appel /api/chat avec :", answer);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: answer }),
      });
      console.log("📥 Réponse status", res.status);
      const { response } = await res.json();
      console.log("📨 Response body:", response);
      setMessages((m) => [...m, { role: "bot", text: response }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Désolé, une erreur est survenue côté IA." },
      ]);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>chatgpt-patrimoine</h1>
      <div
        style={{
          maxHeight: 400,
          overflowY: "auto",
          marginBottom: 10,
          border: "1px solid #eee",
          padding: 10,
          borderRadius: 8,
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === "bot" ? "Bot" : "Toi"} :</strong> {m.text}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ta réponse..."
          style={{
            flex: 1,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
