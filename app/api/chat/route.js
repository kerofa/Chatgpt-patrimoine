import OpenAI from "openai";

export async function POST(req) {
  try {
    console.log("🔑 Clé lue :", process.env.OPENAI_API_KEY?.substr(0,5) + "…");

    const { message } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu es un expert en gestion de patrimoine. Tu tutoies et donnes des réponses directes et humaines." },
        { role: "user", content: message }
      ]
    });
    return new Response(JSON.stringify({ response: chatCompletion.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur API :", error);
    return new Response(JSON.stringify({ response: "Désolé, une erreur est survenue." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
