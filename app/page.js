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
  // messages contient à la fois gating ET chat
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut ! Pour commencer, quel est ton prénom ?" },
  ]);
  const [input, setInput] = useState("");

  const gatingQuestions = [
    "Ton nom de famille ?",
    "Ton adresse e-mail ?",
    "Ton numéro de téléphone ?",
    "Accepterais-tu d'être rappelé pour parler de ton projet ? (oui/non)",
  ];

  // Fonction unique pour envoyer une question ou un message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const answer = input.trim();
    // Ajoute ta réponse à l’historique
    setMessages((m) => [...m, { role: "user", text: answer }]);
    setInput("");

    // Si on est encore en gating (0–4)
    if (stage < 5) {
      // Sauvegarde dans userInfo
      const updated = { ...userInfo };
      if (stage === 0) updated.firstName = answer;
      if (stage === 1) updated.lastName = answer;
      if (stage === 2) updated.email = answer;
      if (stage === 3) updated.phone = answer;
      if (stage === 4) updated.agreeCallback = answer.toLowerCase().startsWith("o");
      setUserInfo(updated);

      const nextStage = stage + 1;
      setStage(nextStage);

      // Après dernière question de gating (stage 4 → nextStage 5)
      if (nextStage === 5 && updated.agreeCallback) {
        // Envoi ton RDV si accord
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
          {
            role: "bot",
            text: "Pas de souci, tu peux poser tes questions directement.",
          },
        ]);
      }

      // Pose soit la prochaine question gating, soit le message d’intro du chat
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

    // Si stage ≥ 5 → on est en mode chat IA
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: answer }),
      });
      const { response } = await res.json();
      setMessages((m) => [...m, { role: "bot", text: response }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Désolé, une erreur est survenue côté IA." },
      ]);
      console.error("Chat error:", err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>chatgpt-patrimoine</h1>
      <div
        style={{ maxHeight: 400, overflowY: "auto", marginBottom: 10 }}
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
          style={{ flex: 1, padding: 10 }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px 20px" }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
