"use client";
import { useState } from "react";

export default function Home() {
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
  const [input, setInput] = useState("")

  const questions = [
    "Ton nom de famille ?",
    "Ton adresse e-mail ?",
    "Ton numéro de téléphone ?",
    "Accepterais-tu d'être rappelé pour parler de ton projet ? (oui/non)",
  ];

  const handleAnswer = async (answer) => {
    const newMsgs = [...messages, { role: "user", text: answer }];
    setMessages(newMsgs);
    setInput("");

    let updated = { ...userInfo };
    if (stage === 0) updated.firstName = answer;
    if (stage === 1) updated.lastName = answer;
    if (stage === 2) updated.email = answer;
    if (stage === 3) updated.phone = answer;
    if (stage === 4) updated.agreeCallback = answer.toLowerCase().startsWith("o");
    setUserInfo(updated);

    const next = stage + 1;
    setStage(next);

    if (next === 5) {
      if (updated.agreeCallback) {
        await fetch("/api/rdv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        setMessages((m) => [
          ...m,
          { role: "bot", text: "Merci ! Tes infos sont bien reçues, je te rappelle bientôt." },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "bot", text: "Pas de souci, tu peux poser tes questions directement." },
        ]);
      }
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Maintenant, pose-moi ta question sur ton patrimoine !" },
      ]);
      return;
    }

    setMessages((m) => [...m, { role: "bot", text: questions[next - 1] }]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    handleAnswer(input.trim());
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>chatgpt-patrimoine</h1>
      <div style={{ maxHeight: 400, overflowY: "auto", marginBottom: 10 }}>
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
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
          Envoyer
        </button>
      </div>
    </div>
  );
}