import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("🔑 Clé OK:", Boolean(process.env.OPENAI_API_KEY));
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es un expert..." },
        { role: "user", content: message }
      ]
    });

    return new Response(JSON.stringify({ response: chatCompletion.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("🔥 Erreur dans /api/chat :", error);
    return new Response(JSON.stringify({ response: "Désolé, une erreur est survenue." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
