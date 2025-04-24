import OpenAI from "openai"

export async function POST(req) {
  try {
    const { message } = await req.json();
    // Log de la clé partielle
    console.log("🔑 OPENAI_API_KEY starts with:", process.env.OPENAI_API_KEY?.substring(0,5));
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu es un expert en gestion de patrimoine..." },
        { role: "user", content: message }
      ]
    });
    return new Response(JSON.stringify({ response: chatCompletion.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("🔥 Erreur dans /api/chat :", err);
    return new Response(JSON.stringify({ response: "Désolé, une erreur est survenue." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
