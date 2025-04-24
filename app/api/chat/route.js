import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es \"Mon Gestionnaire de Patrimoine\", un coach virtuel en gestion de patrimoine. Ton ton est humain, direct et professionnel. Tu aides à optimiser l'épargne, investir, gérer la fiscalité et préparer la retraite. Ne fais pas de promesses de gains, propose des bonnes pratiques et oriente vers un conseiller si besoin."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });
    return new Response(JSON.stringify({ response: completion.choices[0].message.content }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error("Chat error", e);
    return new Response(JSON.stringify({ response: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}